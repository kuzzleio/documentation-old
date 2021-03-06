---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: mDelete
---

# mDelete

{{{since "1.0.0"}}}

<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/&lt;index&gt;/&lt;collection&gt;/_mDelete[?refresh=wait_for]</code>  
<br><b>Method:</b> <code>DELETE</code>  
<br><b>Body:</b>
</p>
</blockquote>


```js
{
  "ids": ["<documentId>", "<anotherDocumentId>", ...]
}
```


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
  "action": "mDelete",
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
  "action": "mDelete",
  ["refresh": "wait_for",]
  "controller": "document",
  "requestId": "<unique request identifier>",
  "result": [
    "<documentId>",
    "<anotherDocumentId>",
    ...
  ]
}
```

Deletes documents in the persistent data storage.

Returns a [partial error]({{ site_base_path }}api-documentation/errors/#partialerror) (with status 206) if one or more document cannot be deleted.

The optional parameter `refresh` can be used
with the value `wait_for` in order to wait for the document to be indexed (indexed documents are available for `search`).
