---
layout: full.html
algolia: true
title: bulk
show-subheader: true
subheader-title: Introduction
order: 700
---

# bulk controller

A bulk import allows your application to perform multiple write operations in a single request.
This is especially useful if you want to create a large number of documents. A bulk import request will execute faster than multiple requests to the `create` action.

The syntax for bulk imports closely resembles the
[ElasticSearch Bulk API](https://www.elastic.co/guide/en/elasticsearch/reference/5.x/docs-bulk.html).

<aside class="warning">
The bulk operations only apply to the persistent data storage layer.
You <strong>won't receive any real-time notfications</strong> on your document subcriptions
even if some of the documents in the import match your subscription filters.
</aside>
