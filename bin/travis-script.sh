#!/bin/bash

HOST="http://docs.kuzzle.io"
VERSION_PATH=$(cat "versions.config.json" | jq -r "map(select(.version_gh_branch == \"${TRAVIS_BRANCH}\")) | .[].version_path")

if [ "${TRAVIS_PULL_REQUEST}" = "false" ]; then
  set -ex

  node index.js --build-host "${HOST}" --build-path "${VERSION_PATH}" --build-compress
else
  echo "No build needed. Bye"
  exit 0
fi

exit 0
