#!/bin/bash

set -ex

HOST="https://stafyniaksacha.github.io"
VERSION_PATH=$(cat "versions.config.json" | jq -r "map(select(.version_gh_branch == \"${TRAVIS_BRANCH}\")) | .[].version_path")

node index.js --build-host "${HOST}" --build-path "${VERSION_PATH}" --build-compress
