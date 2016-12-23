#!/bin/bash


cd /app/guide \
  && bundle exec middleman build \
  && ln -s /app/guide/build /usr/share/nginx/html/guide

cd /app/sdk-reference \
  && bundle exec middleman build \
  && ln -s /app/sdk-reference/build /usr/share/nginx/html/sdk-reference

cd /app/api-reference \
  && bundle exec middleman build \
  && ln -s /app/api-reference/build /usr/share/nginx/html/api-reference

cd /app/dsl-reference \
  && bundle exec middleman build \
  && ln -s /app/dsl-reference/build /usr/share/nginx/html/dsl-reference

cd /app/validation-reference \
  && bundle exec middleman build \
  && ln -s /app/validation-reference/build /usr/share/nginx/html/validation-reference

cd /app/plugin-reference \
  && bundle exec middleman build \
  && ln -s /app/plugin-reference/build /usr/share/nginx/html/plugin-reference

cd /app/elasticsearch-cookbook \
  && bundle exec middleman build \
  && ln -s /app/elasticsearch-cookbook/build /usr/share/nginx/html/elasticsearch-cookbook

/watch.sh &

nginx -g 'daemon off;'
