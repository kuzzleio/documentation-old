#!/bin/bash
TMPFILE=/tmp/watch

while true; do
  inotifywait -q -e modify,create,delete -r ./{guide,api-reference,dsl-reference,sdk-reference,validation-reference} -o $TMPFILE --format %w && \
    CHANGED=$(cat /tmp/watch | cut -d "/" -f2) && \
    pushd $CHANGED && \
    bundle exec middleman build && \
    popd && \
    truncate -s 0 $TMPFILE
done
