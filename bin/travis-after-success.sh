#!/bin/bash

set -e

if [ "${TRAVIS_PULL_REQUEST}" = "false" ]; then
  HOST="http://docs.kuzzle.io"
  HOST_PATH="./build"

  git config --global user.email "support@kuzzle.io"
  git config --global user.name "Travis CI"

  git clone -b gh-pages https://${GH_TOKEN}@github.com/${TRAVIS_REPO_SLUG} "/tmp/gh-pages"

  cp -r ${HOST_PATH}/* "/tmp/gh-pages"


  cd "/tmp/gh-pages"

  set -v

  git add .
  git commit -m "Travis build ${TRAVIS_BUILD_NUMBER}"
  git push -fq origin gh-pages
else
  echo "No build needed. Bye"
  exit 0
fi

exit 0
