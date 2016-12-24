#!/bin/bash

TMPFILE=/tmp/watch
SLATEDIRS=`cat /slatedirs`
SLATEDIRS_LINE=`echo $SLATEDIRS | sed -r 's# # -r /app/#g'`

while true; do
  inotifywait -q -e modify,create,delete -r /app/$SLATEDIRS_LINE -o $TMPFILE --format %w && \
    CHANGED=$(cat $TMPFILE | cut -d "/" -f3) && \
    cd /app/$CHANGED && \
    bundle exec middleman build --verbose && \
    echo "Dynamic build succes for project $CHANGED" && \
    truncate -s 0 $TMPFILE
done
