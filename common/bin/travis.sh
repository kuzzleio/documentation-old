#!/bin/bash

SLATEDIRS=(`cat /slatedirs`)

for SLATEDIR in "${SLATEDIRS[@]}"
do
  echo "Building $SLATEDIR"

  cd $TRAVIS_BUILD_DIR/$SLATEDIR
  bundle exec middleman build --verbose
done
