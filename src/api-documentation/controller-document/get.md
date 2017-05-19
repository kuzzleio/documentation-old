---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: get
---

# get


<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/<index>/<collection>/<documentId>`  
**Method:** `GET`
</p>
</blockquote>

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
  "action": "get",

  "_id": "<documentId>"
}
```

>**Response**

```javascript
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
    }
  }
}
```

Given a `document id`, retrieves the corresponding document from the database.

Only documents in the persistent data storage layer can be retrieved.
