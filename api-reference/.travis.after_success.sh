#!/bin/bash

set -ev

if [ "${TRAVIS_BRANCH}" = "master" -a "${TRAVIS_PULL_REQUEST}" = "false" ];
then
  git config --global user.email "support@kuzzle.io"
  git config --global user.name "Travis CI"

  git clone -b gh-pages https://${GH_TOKEN}@github.com/${TRAVIS_REPO_SLUG} travis-build

  cp -rp build/* travis-build/
  cd travis-build
  git add .
  git commit -m "Travis build ${TRAVIS_BUILD_NUMBER}"
  git push -fq origin gh-pages > /dev/null 2>&1
else
  echo "Not on master branch. No build needed. Bye"
  exit 0
fi

exit 0
