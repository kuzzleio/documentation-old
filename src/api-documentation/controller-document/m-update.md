---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: mUpdate
---

# mUpdate


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
      "_id": "<anotherDocumentId>" // Mandatory
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

Returns a partial error (with status 206) if one or more documents can not be updated.

Elastisearch 5.x and above only: The optional parameter `refresh` can be used
with the value `wait_for` in order to wait for the document indexation (indexed documents are available for `search`).

Conflicts may occur if the same document gets updated multiple times within a short time on a database cluster. When this happens, Kuzzle answers with an error that clients have to handle.  
You may set the `retryOnConflict` optional argument with a positive integer, asking Kuzzle to retry updating the document that number of times before rejecting the request with an error.
