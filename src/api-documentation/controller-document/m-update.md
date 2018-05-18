---
layout: side-code.html.handlebars
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: mUpdate
---

# mUpdate

{{{since "1.0.0"}}}

<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/<index>/<collection>/_mUpdate[?refresh=wait_for][&retryOnConflict=<retries>]`  
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
        "partial": "body",
        ...
      }
    },
    {
      "_id": "<anotherDocumentId>", // Mandatory
      "body": {
        "partial": "body",
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
  "action": "mUpdate",
  "body": {
    "documents": [
      {
        "_id": "<documentId>",
        "body": {
          "partial": "body",
        }
      },
      {
        "_id": "<anotherDocumentId>",
        "body": {
          "partial": "body",
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
  "action": "mUpdate",
  "refresh": "wait_for",
  "retryOnConflict": "<number of retries>",
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
        "_type": "<collection>",
        "_version": 2,
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
        "_type": "<collection>",
        "_version": 2,
        "result": "updated"
      },
      {
   // Other updated documents
      }
    ],
    "total": "<number of updated documents>"
  }
}
```

Updates documents in the persistent data storage.

Returns a partial error (with status 206) if one or more documents cannot be updated.

The optional parameter `refresh` can be used
with the value `wait_for` in order to wait for the document to be indexed (indexed documents are available for `search`).

Conflicts may occur if the same document gets updated multiple times within a short timespan in a database cluster. When this happens, Kuzzle will return an error.  
You can set the `retryOnConflict` optional argument (with a retry count), to tell Kuzzle to retry the document update a specified amount of times before rejecting the request with an error.
