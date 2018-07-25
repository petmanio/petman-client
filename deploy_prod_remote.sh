#!/usr/bin/env bash
set -e
rm -rf ./dist/
npm run build:ssr:prod
rsync -a --delete --progress dist/ production@petman.io:/opt/petman-client/dist
