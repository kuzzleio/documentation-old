---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: create
---

# create

{{{since "1.0.0"}}}

<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/&lt;index&gt;/&lt;collection&gt;/_create[?refresh=wait_for]</code>  
<br><b>Alternative URL:</b> <code>http://kuzzle:7512/&lt;index&gt;/&lt;collection&gt;/&lt;documentId&gt;/_create[?refresh=wait_for]</code>  
<br><b>Method:</b> <code>POST</code>  
<br><b>Body:</b>
</p>
</blockquote>

```js
{
  // Document content
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
  "action": "create",
  "refresh": "wait_for",
  "_id": "<documentId>",            
  "body": {}
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
  "action": "create",
  "requestId": "<unique request identifier>",
  "result": {
    "_id": "<documentId>",  // The generated or provided document id
    "_version": 1 // The version of the document in the persistent data storage
    "_source": { // The created document
      ...
    },
  }
}
```

Creates a new document in the persistent data storage.

Returns an error if the document already exists.

The optional parameter `refresh` can be used
with the value `wait_for` in order to wait for the document to be indexed (indexed documents are available for `search`).
