#!/bin/bash

BINDIR=$(dirname $0)
SLATEDIRS=(`cat $BINDIR/slatedirs`)

set -ev

deploy () {
  DEST="travis-build"
  if [ "$1" != "" ]; then
    DEST="$DEST/v/$1"
  fi

  git config --global user.email "support@kuzzle.io"
  git config --global user.name "Travis CI"

  git clone -b gh-pages https://${GH_TOKEN}@github.com/${TRAVIS_REPO_SLUG} travis-build

  mkdir -p "$DEST"

  for SLATEDIR in "${SLATEDIRS[@]}"
  do
    if [[ ! -d $DEST/$SLATEDIR ]]; then
      mkdir -p "$DEST/$SLATEDIR"
    fi

    cp -rp $TRAVIS_BUILD_DIR/$SLATEDIR/build/* "$DEST/$SLATEDIR/"
  done
  #cp index.html "$DEST/index.html"

  # DEPLOY HOME
  cp -r $TRAVIS_BUILD_DIR/home "$DEST/home"

  cd travis-build

  git add .
  git commit -m "Travis build ${TRAVIS_BUILD_NUMBER}"
  git push -fq origin gh-pages > /dev/null 2>&1
}


if [ "${TRAVIS_BRANCH}" = "master" -a "${TRAVIS_PULL_REQUEST}" = "false" ]; then
  deploy ""
elif [ "${TRAVIS_BRANCH}" = "develop" -a "${TRAVIS_PULL_REQUEST}" = "false" ]; then
  deploy "edge"
else
  echo "No build needed. Bye"
  exit 0
fi

exit 0
