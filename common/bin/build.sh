#!/bin/bash

# echo "Clean default files"
# rm -vf /usr/share/nginx/html/*

SLATEDIRS=(`cat /slatedirs`)

for SLATEDIR in "${SLATEDIRS[@]}"
do
  echo "Building $SLATEDIR"

  cd /app/$SLATEDIR

  if [[ ! -d build ]]; then
    mkdir build
  fi

  ln -s /app/$SLATEDIR/build /usr/share/nginx/html/$SLATEDIR

  bundle exec middleman build --verbose || true
done

# echo "Linkink default home files"
# ln -s /app/home/* /usr/share/nginx/html/
