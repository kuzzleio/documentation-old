---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: mReplace
---

# mReplace

{{{since "1.0.0"}}}

<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/&lt;index&gt;/&lt;collection&gt;/_mReplace[?refresh=wait_for]</code>  
<br><b>Method:</b> <code>PUT</code>  
<br><b>Body:</b>
</p>
</blockquote>


```js
{
  "documents": [
    {
      "_id": "<documentId>", // Mandatory
      "body": {
        "document": "body",
        ...
      }
    },
    {
      "_id": "<anotherDocumentId>", // Mandatory
      "body": {
        "document": "body",
        ...
      }
    },
    ...
  ]
}
```


<blockquote class="json">
<p>
<b>Query:</b>
</p>
</blockquote>


```json
{
  "index": "<index>",
  "collection": "<collection>",
  "controller": "document",
  "action": "mReplace",
  "refresh": "wait_for",
  "body": {
    "documents": [
      {
        "_id": "<documentId>",
        "body": {
          "document": "body",
        }
      },
      {
        "_id": "<anotherDocumentId>",
        "body": {
          "document": "body",
        }
      },
    ]
  }
}
```

>**Response**

```javascript
{
  "status": 200,
  "error": null,
  "index": "<index>",
  "collection": "<collection>",
  "action": "mReplace",
  "controller": "document",
  "requestId": "<unique request identifier>",
  "result": {
    "hits": [
      {
        "_id": "<documentId>",
        "_index": "<index>",
        "_shards": {
          "failed": 0,
          "successful": 1,
          "total": 2
        },
        "_source": {
          "document": "body"
        },
        "_meta": {
          "active": true,
          "author": "-1",
          "createdAt": 1484226104822,
          "deletedAt": null,
          "updatedAt": null,
          "updater": null
        },
        "_type": "<collection>",
        "_version": 2,
        "created": false,
        "result": "updated"
      },
      {
        "_id": "<anotherDocumentId>",
        "_index": "<index>",
        "_shards": {
          "failed": 0,
          "successful": 1,
          "total": 2
        },
        "_source": {
          "document": "body"
        },
        "_meta": {
          "active": true,
          "author": "-1",
          "createdAt": 1484226104822,
          "deletedAt": null,
          "updatedAt": null,
          "updater": null
        },
        "_type": "<collection>",
        "_version": 2,
        "created": false,
        "result": "updated"
      },
      {
        // Other replaced documents
      }
    ],
    "total": "<number of replaced documents>"
  }
}
```

Replaces documents in the persistent data storage.

Returns a [partial error]({{ site_base_path }}api-documentation/errors/#partialerror) (with status 206) if one or more documents cannot be replaced.

The optional parameter `refresh` can be used
with the value `wait_for` in order to wait for the document to be indexed (indexed documents are available for `search`).
