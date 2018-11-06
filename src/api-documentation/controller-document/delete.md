---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: delete
---

# delete

{{{since "1.0.0"}}}

<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/&lt;index&gt;/&lt;collection&gt;/&lt;documentId&gt;[?refresh=wait_for]</code>  
<br><b>Method:</b> <code>DELETE</code>
</p>
</blockquote>

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

Given a `documentId`, deletes the corresponding document from Kuzzle.

Only documents in the persistent data storage layer can be deleted.

The optional parameter `refresh` can be used
with the value `wait_for` in order to wait for the document to be deleted (and to no longer be available in `search`).
