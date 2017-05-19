---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: delete
---

# delete


<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/<index>/<collection>/<documentId>[?refresh=wait_for]`  
**Method:** `DELETE`
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
  "action": "delete",
  "refresh": "wait_for",

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
  "action": "delete",
  "requestId": "<unique request identifier>",
  "result": {
    "_id": "<documentId>"// The deleted document identifier
  }
}
```

Given a `documentId`, deletes the corresponding document from Kuzzle's database.

Only documents in the persistent data storage layer can be deleted.

Elastisearch 5.x and above only: The optional parameter `refresh` can be used
with the value `wait_for` in order to wait for the document deletion (and its unavailability in `search`).
