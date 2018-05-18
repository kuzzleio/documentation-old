---
layout: side-code.html.handlebars
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: mGet
---

# mGet

{{{since "1.0.0"}}}

<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/<index>/<collection>/_mGet[?includeTrash=<boolean>]`  
**Method:** `POST`  
**Body:**
</p>
</blockquote>


```js
{
  "ids": ["<documentId>", "<anotherDocumentId>", ...],

  // Optional arguments
  "includeTrash": false
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
  "action": "mGet",
  "body": {
    "ids": ["<documentId>", "<anotherDocumentId>"]
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
  "action": "mGet",
  "controller": "document",
  "requestId": "<unique request identifier>",
  "result": {
    "hits": [
      {
        "_id": "<documentId>",
        "_index": "<index>",
        "_source": {
          "some": "body"
        },
        "_meta": {
          "active": true,
          "author": "-1",
          "createdAt": 1484226562795,
          "deletedAt": null,
          "updatedAt": null,
          "updater": null
        },
        "_type": "<collection>",
        "_version": 4,
        "found": true
      },
      {
        "_id": "<anotherDocumentId>",
        "_index": "<index>",
        "_source": {
          "some": "body"
        },
        "_meta": {
          "active": true,
          "author": "-1",
          "createdAt": 1484226562795,
          "deletedAt": null,
          "updatedAt": null,
          "updater": null
        },
        "_type": "<collection>",
        "_version": 4,
        "found": true
      }
      {
   // Other documents
      }
    ],
    "total": "<number of retrieved documents>"
  }
}
```

Given `document ids`, retrieves the corresponding documents from the database.

Only documents in the persistent data storage layer can be retrieved.

Returns a [partial error]({{ site_base_path }}api-documentation/errors/#partialerror) (with status 206) if one or more documents cannot be retrieved.

Optional arguments:

- `includeTrash`: if set, documents in the [trashcan]({{ site_base_path }}guide/essentials/document-metadata/) will also be returned.
