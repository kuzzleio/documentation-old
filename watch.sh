#!/bin/bash
TMPFILE=/tmp/watch

while true; do
  inotifywait -q -e modify,create,delete -r  /app/{guide,api-reference,dsl-reference,sdk-reference,validation-reference,plugin-reference,elasticsearch-cookbook} -o $TMPFILE --format %w && \
    CHANGED=$(cat /tmp/watch | cut -d "/" -f3) && \
    pushd /app/$CHANGED && \
    bundle exec middleman build && \
    popd && \
    truncate -s 0 $TMPFILE
done
