---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: mReplace
---

# mReplace


<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/<index>/<collection>/_mReplace[?refresh=wait_for]`  
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
   // Other replaced documents
      }
    ],
    "total": "<number of replaced documents>"
  }
}
```

Replaces documents in the persistent data storage.

Returns a [partial error]({{ site_base_path }}api-documentation/errors/#partialerror) (with status 206) if one or more documents can not be replaced.

Elastisearch 5.x and above only: The optional parameter `refresh` can be used
with the value `wait_for` in order to wait for the document indexation (indexed documents are available for `search`).
