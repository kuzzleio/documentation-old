#!/bin/bash

set -e

BINDIR=$(dirname $0)
SLATEDIRS=(`cat $BINDIR/slatedirs`)

cd $TRAVIS_BUILD_DIR/common/slate
bundle install

for SLATEDIR in "${SLATEDIRS[@]}"
do
  echo "Building $SLATEDIR"

  cd $TRAVIS_BUILD_DIR/$SLATEDIR
  bundle exec middleman build --verbose
done
