#!/usr/bin/env bash
# Árbol de trabajo aislado para publicar guías en el blog de Testia.
#
# La tarea diaria no puede escribir en el repositorio de siempre: puede haber una
# sesión abierta con cambios sin guardar. Esto crea una copia aparte a partir de
# `origin/main`, se trabaja ahí y se borra al terminar. El árbol de trabajo real
# no se toca en ningún momento.
#
#   scripts/blog-worktree.sh open
#   scripts/blog-worktree.sh publish <ruta> "<mensaje>"
#   scripts/blog-worktree.sh close <ruta>
set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cmd="${1:-}"

die() { echo "blog-worktree: $1" >&2; exit 1; }

# Ficheros que una guía nueva puede tocar. Cualquier otro cambio aborta la publicación.
ALLOWED='^(blog/[^/]+\.html$|blog\.html$|sitemap\.xml$|plan-editorial-seo\.md$|editorial/topic-queue\.json$|test/[^/]+\.html$)'

case "$cmd" in
  open)
    git -C "$REPO" fetch --quiet origin main || die "no se pudo traer origin/main"
    stamp="$(date +%Y%m%d-%H%M%S)"
    path="/tmp/testia-blog-$stamp"
    branch="blog/auto-$stamp"
    git -C "$REPO" worktree add --quiet -b "$branch" "$path" origin/main \
      || die "no se pudo crear el árbol de trabajo"
    # El proyecto de Vercel no está conectado a GitHub: el despliegue lo hace la
    # CLI desde el árbol. Necesita el enlace al proyecto (.vercel está ignorado por git).
    [ -d "$REPO/.vercel" ] && cp -R "$REPO/.vercel" "$path/.vercel"
    echo "$path"
    ;;

  publish)
    path="${2:-}"; msg="${3:-}"
    [ -d "$path" ] || die "ruta no válida: $path"
    [ -n "$msg" ] || die "falta el mensaje de commit"

    fuera="$(git -C "$path" status --porcelain --untracked-files=all | awk '{print $2}' \
      | grep -Ev "$ALLOWED" || true)"
    if [ -n "$fuera" ]; then
      die "hay cambios fuera del blog, no se publica:
$fuera"
    fi
    nuevo="$(git -C "$path" status --porcelain --untracked-files=all | awk '$1=="??" && $2 ~ /^blog\/.*\.html$/ {print $2}')"
    [ -n "$nuevo" ] || die "no hay ninguna guía nueva en blog/, no se publica"
    [ "$(echo "$nuevo" | wc -l | tr -d ' ')" = "1" ] || die "hay más de una guía nueva; publica una por día"
    grep -q "$(basename "$nuevo" .html)" "$path/blog.html" || die "la guía no está enlazada en blog.html"
    grep -q "$(basename "$nuevo" .html)" "$path/sitemap.xml" || die "la guía no está en sitemap.xml"

    node "$REPO/scripts/validate-blog.mjs" "$path" "$nuevo" || die "la validación de la guía ha fallado"
    (cd "$path" && node validate-pages.mjs) || die "la validación de las landings ha fallado"

    git -C "$path" add -A -- blog blog.html sitemap.xml plan-editorial-seo.md editorial/topic-queue.json test
    git -C "$path" -c user.name="Testia Blog" -c user.email="noreply@testia.info" \
      commit --quiet -m "$msg"

    git -C "$path" fetch --quiet origin main
    git -C "$path" rebase --quiet origin/main || die "el rebase sobre origin/main ha fallado"
    git -C "$path" push --quiet origin HEAD:main || die "el push a main ha fallado"
    echo "publicado: $(git -C "$path" log --oneline -1)"

    # Despliegue a producción. Si falla, el commit ya está en main: basta con
    # ejecutar `vercel deploy --prod --yes` desde el repositorio principal.
    [ -d "$path/.vercel" ] || die "falta .vercel en el árbol; publicado en git pero SIN desplegar"
    (cd "$path" && vercel deploy --prod --yes >/tmp/testia-blog-deploy.log 2>&1) \
      || die "vercel deploy ha fallado (ver /tmp/testia-blog-deploy.log); publicado en git pero SIN desplegar"
    echo "desplegado: $(grep -o 'https://www.testia.info[^ ]*' /tmp/testia-blog-deploy.log | head -1 || tail -1 /tmp/testia-blog-deploy.log)"
    ;;

  close)
    path="${2:-}"
    [ -n "$path" ] || die "falta la ruta"
    branch="$(git -C "$path" rev-parse --abbrev-ref HEAD 2>/dev/null || true)"
    git -C "$REPO" worktree remove --force "$path" 2>/dev/null || rm -rf "$path"
    [ -n "$branch" ] && git -C "$REPO" branch -D "$branch" >/dev/null 2>&1 || true
    git -C "$REPO" worktree prune
    echo "cerrado"
    ;;

  *)
    die "uso: $0 open | publish <ruta> <mensaje> | close <ruta>"
    ;;
esac
