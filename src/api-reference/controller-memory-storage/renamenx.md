---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: renamenx
---

# renamenx




<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_renamenx/<key>`  
**Method:** `POST`  
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
**Query**
</p>
</blockquote>


```json
{
  "controller": "ms",
  "action": "renamenx",
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
  "action": "renamenx",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "OK"
}
```

Renames a key to `newkey`, only if `newkey` does not already exist.

[[_Redis documentation_]](https://redis.io/commands/renamenx)
