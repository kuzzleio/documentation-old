---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: incrbyfloat
---

# incrbyfloat



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_incrbyfloat/<key>`  
**Method:** `POST`  
**Body:**
</p>
</blockquote>


```js
{
  "value": "<increment value>"
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
  "action": "incrbyfloat",
  "_id": "<key>",
  "body": {
    "value": "<increment value>"
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
  "action": "incrbyfloat",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<updated key value>"
}
```

Increments the number stored at `key` by the provided float value. If the key does not exist, it is set to 0 before performing the operation.

[[_Redis documentation_]](https://redis.io/commands/incrbyfloat)
