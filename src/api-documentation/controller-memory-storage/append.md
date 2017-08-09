---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: append
---

# append

<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_append/<key>`  
**Method:** `POST`  
**Body:**
</p>
</blockquote>


```js
{
  "value": "value to be appended to the key"
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
  "action": "append",
  "_id": "<key>",
  "body": {
    "value": "value to be appended to the key"
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
  "action": "append",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<new value length after the append operation>"
}
```

Appends a value to a key. If the key does not exist, it is created.

[[_Redis documentation_]](https://redis.io/commands/append)
