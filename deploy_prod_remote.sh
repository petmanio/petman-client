#!/usr/bin/env bash
set -e
rm -rf ./dist/
npm run build:ssr:prod
rsync -a --delete --progress dist/ andranik@petman.io:/opt/petman-client/dist

