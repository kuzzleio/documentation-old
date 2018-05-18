---
layout: side-code.html.handlebars
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: update
---

# update

{{{since "1.0.0"}}}

<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/<index>/<collection>/<documentId>/_update[?refresh=wait_for][&retryOnConflict=<retries>]`  
**Method:** `PUT`  
**Body:**
</p>
</blockquote>


```js
{
  "field_to_update1": "new value",
  "field_to_update2": "new value",
  ...
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
  "action": "update",
  "refresh": "wait_for",
  "retryOnConflict": "<number of retries>",
  "_id": "<documentId>",

  "body": {
    "field_to_update1": "new value",
    "field_to_update2": "new value",
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
  "controller": "document",
  "action": "update",
  "requestId": "<unique request identifier>",
  "result": {
    "_id": "<documentId>",
    "_version": "<number>",// The new version number of this document
    "created": false
  }
}
```

Only documents in the persistent data storage layer can be updated.

The optional parameter `refresh` can be used
with the value `wait_for` in order to wait for the document to be indexed (indexed documents are available for `search`).

Conflicts may occur if the same document gets updated multiple times within a short timespan in a database cluster. When this happens, Kuzzle returns an error.  
You can set the `retryOnConflict` optional argument (with a retry count), to tell Kuzzle to retry the document update a specified amount of times before rejecting the request with an error.
