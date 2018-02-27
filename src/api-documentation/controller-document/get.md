---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: get
---

# get

{{{since "1.0.0"}}}

<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/<index>/<collection>/<documentId>[?includeTrash=<boolean>]`  
**Method:** `GET`
</p>
</blockquote>

<blockquote class="json">
<p>
**Query:**
</p>
</blockquote>


```js
{
  "index": "<index>",
  "collection": "<collection>",
  "controller": "document",
  "action": "get",
  "_id": "<documentId>",

  // Optional arguments
  "includeTrash": false
}
```

>**Response**

```js
{
  "status": 200,
  "error": null,
  "index": "<index>",
  "collection": "<collection>",
  "controller": "document",
  "action": "get",
  "requestId": "<unique request identifier>",
  "result": {
    "_id": "<documentId>",
    "_index": "<index>",
    "_type": "<collection>",
    "_version": 1,
    "_source": {
      "name": {
        "first": "Steve",
        "last": "Wozniak"
      },
      "hobby": "Segway polo",
      ...
    },
    "_meta": {
      "author": "Bob",
      ...
    }
  }
}
```

Given a `document id`, retrieves the corresponding document from the database.

Only documents in the persistent data storage layer can be retrieved.

Optional argument:

* `includeTrash`: if set, Kuzzle Backend will also look for the document in the [trashcan]({{ site_base_path }}guide/essentials/document-metadata/). Otherwise, if the document exists but is inactive, a [NotFound]({{ site_base_path }}api-documentation/errors/#notfounderror) error is returned.
