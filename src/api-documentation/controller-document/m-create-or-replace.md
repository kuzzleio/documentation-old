---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: mCreateOrReplace
---

# mCreateOrReplace


<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/<index>/<collection>/_mCreateOrReplace[?refresh=wait_for]`  
**Method:** `PUT`  
**Body:**
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
      "_id": "<anotherDocumentId>" // Mandatory
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
  "action": "mCreateOrReplace",
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
  "action": "mCreateOrReplace",
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
            "createdAt": 1484226104822,
            "deletedAt": null,
            "updatedAt": null,
            "updater": null
          },
          "document": "body"
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
          "_meta": {
            "active": true,
            "author": "-1",
            "createdAt": 1484226104822,
            "deletedAt": null,
            "updatedAt": null,
            "updater": null
          },
          "document": "body"
        },
        "_type": "<collection>",
        "_version": 2,
        "created": false,
        "result": "updated"
      },
      {
   // Other created or replaced documents
      }
    ],
    "total": "<number of created or replaced documents>"
  }
}
```

Creates or replaces documents in the persistent data storage.

Returns a [partial error]({{ site_base_path }}api-documentation/errors/#partialerror) (with status 206) if one or more documents can not be created or replaced.
