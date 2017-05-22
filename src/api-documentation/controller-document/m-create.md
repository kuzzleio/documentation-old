---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: mCreate
---

# mCreate


<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/<index>/<collection>/_mCreate[?refresh=wait_for]`  
**Method:** `POST`  
**Body:**
</p>
</blockquote>


```js
{
  "documents": [
    {
      "_id": "<documentId>", // Optional. If not provided, will be generated automatically.
      "body": {
        "document": "body",
        ...
      }
    },
    {
      "_id": "<anotherDocumentId>" // Optional. If not provided, will be generated automatically.
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
**Query:**
</p>
</blockquote>


```json
{
  "index": "<index>",
  "collection": "<collection>",
  "controller": "document",
  "action": "mCreate",
  "refresh": "wait_for",
  "body": {
    "documents": [
      {
        "_id": "<documentId>",
        "body": {
          "document": "body"
        }
      },
      {
        "_id": "<anotherDocumentId>",
        "body": {
          "document": "body"
        }
      }
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
  "action": "mCreate",
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
          "_meta": {
            "active": true,
            "author": "-1",
            "createdAt": 1484225532686,
            "deletedAt": null,
            "updatedAt": null,
            "updater": null
          },
          "document": "body"
        },
        "_type": "<collection>",
        "_version": 1,
        "created": true,
        "result": "created"
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
          "_meta": {
            "active": true,
            "author": "-1",
            "createdAt": 1484225532686,
            "deletedAt": null,
            "updatedAt": null,
            "updater": null
          },
          "document": "body"
        },
        "_type": "<collection>",
        "_version": 1,
        "created": true,
        "result": "created"
      },
      {
   // Other created documents
      }
    ],
    "total": "<number of created documents>"
  }
}
```

Creates new documents in the persistent data storage.

Returns a [partial error]({{ site_base_path }}api-documentation/errors/#partialerror) (with status 206) if one or more documents creation fails.

Elastisearch 5.x and above only: The optional parameter `refresh` can be used
with the value `wait_for` in order to wait for the document indexation (indexed documents are available for `search`).
