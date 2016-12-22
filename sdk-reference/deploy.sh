#! /bin/bash

set -ev

if [ "${TRAVIS_BRANCH}" = "master"  -a "${TRAVIS_PULL_REQUEST}" = "false" ]
then
  echo "Push generated dist folder"
  git config --global user.email "support@kuzzle.io"
  git config --global user.name "Travis CI"
  git clone --quiet --branch=gh-pages https://${GH_TOKEN}@github.com/${TRAVIS_REPO_SLUG} travis-build
  cp -rp build/* travis-build/ && cd travis-build

  git add .
  git commit -m "Travis CI auto-merge from travis build ${TRAVIS_BUILD_NUMBER}"
  git push -fq origin gh-pages > /dev/null 2>&1
else
  echo "Not on master branch - no need to deploy."
  exit 0
fi

exit 0
