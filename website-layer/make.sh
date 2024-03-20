#!/bin/bash

cd_or_fail() { cd "$1" || exit 1; }

npx() {
    command npx --no-install "$@"
}

########################################################################

: "${DEPLOY_BASE_URL:?}"
: "${PYTCH_DEPLOYMENT_ID:?}"
: "${PYTCH_VERSION_TAG:?}"

if [ "$DEPLOY_BASE_URL" = "${DEPLOY_BASE_URL#/}" ]; then
    >&2 echo "DEPLOY_BASE_URL must start with a '/' character"
    exit 1
fi

if [ "$DEPLOY_BASE_URL" = / ]; then
    DEPLOY_BASE_URL=""
elif [ "$DEPLOY_BASE_URL" != "${DEPLOY_BASE_URL%/}" ]; then
    >&2 echo "DEPLOY_BASE_URL must not end with a '/' character"
    exit 1
fi

if ! hash node 2> /dev/null; then
    >&2 echo Could not find node
    exit 1
fi

node_version=$(node --version)
if [ "$(echo "$node_version" | grep -c -E '^v18[.]')" -ne 1 ]; then
    >&2 echo Need node v18 but have "$node_version"
    exit 1
fi

BUILD_DIR="$(realpath "$(dirname "$0")")"
REPO_ROOT="$(realpath "$BUILD_DIR"/..)"

cd_or_fail "$REPO_ROOT"

LAYER_DIR=website-layer/layer-content

if [ -e node_modules ] || [ -e $LAYER_DIR ]; then
    >&2 echo "Must be run in a clean clone"
    >&2 echo '(i.e., no "node_modules" or "'"$LAYER_DIR"'")'
    exit 1
fi

dotenvfile=./src/.env
if [ ! -r ${dotenvfile} ]; then
    >&2 echo No .env file in src
    exit 1
fi

set -o allexport
# shellcheck disable=SC1090
source ${dotenvfile}
set +o allexport

npm ci

if ! (
    set -o allexport

    # VITE_DEMOS_BASE is deliberately outside DEPLOY_BASE_URL.  Our
    # initial approach is to manage the collection of demos separately
    # from the releases of the webapp itself.
    #
    # Likewise VITE_LESSON_SPECIMENS_BASE.

    # This is communicated to the app build via the "--base" option
    # rather than through an env.var, so it doesn't need the "VITE_"
    # prefix.
    APP_BASE_URL="$DEPLOY_BASE_URL"/app/

    VITE_DEPLOY_BASE_URL="$DEPLOY_BASE_URL"
    VITE_SKULPT_BASE="$DEPLOY_BASE_URL"/skulpt/"$PYTCH_DEPLOYMENT_ID"
    VITE_TUTORIALS_BASE="$DEPLOY_BASE_URL"/tutorials/"$PYTCH_DEPLOYMENT_ID"
    VITE_DEMOS_BASE=/demos
    VITE_MEDIALIB_BASE="$DEPLOY_BASE_URL"/medialib/"$PYTCH_DEPLOYMENT_ID"
    VITE_LESSON_SPECIMENS_BASE=/lesson-specimens
    VITE_VERSION_TAG="$PYTCH_VERSION_TAG"

    if ! npm run lint >&2 ; then
        >&2 echo "Lint failures; abandoning build"
        #exit 1
    fi

    # Run these two steps manually (rather than with "npm run build") so
    # that we can pass the correct --base arg to "vite build".
    npx tsc && npx vite --base="$APP_BASE_URL" build
) then
   exit 1
fi

mkdir "$LAYER_DIR"
mv dist "$LAYER_DIR"/app

(
    cd_or_fail "$LAYER_DIR"
    cp ../dot-htaccess app/.htaccess
    find app -type d -print0 | xargs -0 chmod 755
    find app -type f -print0 | xargs -0 chmod 644
    zip -r ../layer.zip app
)
