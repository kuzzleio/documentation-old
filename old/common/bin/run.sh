#!/bin/bash

/build.sh
echo "Slates instances builded successfully"

echo "Watching for changes in background"
/watch.sh &

echo "Runing nginx daemon on http://localhost:80"
nginx -g 'daemon off;'
