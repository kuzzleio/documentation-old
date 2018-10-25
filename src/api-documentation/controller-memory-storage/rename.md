---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: rename
---

# rename

{{{since "1.0.0"}}}




<blockquote class="js">
<p>
<b>URL:</b> `http://kuzzle:7512/ms/_rename/<key>`  
</br><b>Method:</b> `POST`  
**Body:**
</p>
</blockquote>


```js
{
  "newkey": "<new key name>"
}
```



<blockquote class="json">
<p>
<b>Query</b>
</p>
</blockquote>


```json
{
  "controller": "ms",
  "action": "rename",
  "_id": "<key>",
  "body": {
    "newkey": "<new key name>"
  }
}
```

>**Response**

```javascript
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "rename",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "OK"
}
```

Renames a key to `newkey`. If `newkey` already exists, it is overwritten.

[[_Redis documentation_]](https://redis.io/commands/rename)
