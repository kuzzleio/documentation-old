---
layout: full.html
algolia: true
title: bulk
show-subheader: true
subheader-title: Introduction
order: 700
---

# bulk controller

A bulk import allows your application to perform multiple writing operations thanks to a single query.
This is especially useful if you want to create a large number of documents. A bulk import will be
a lot faster compared to creating them individually using `create` queries.

For other queries, the syntax for bulk imports closely resembles the
[ElasticSearch Bulk API](https://www.elastic.co/guide/en/elasticsearch/reference/5.x/docs-bulk.html).

<aside class="warning">
The bulk operations only apply to the persistent data storage layer.
You <strong>won't receive any real-time notfications</strong> on your document subcriptions
even if some of the documents in the import match your subscription filters.
</aside>
