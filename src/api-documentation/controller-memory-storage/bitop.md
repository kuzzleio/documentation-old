---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: bitop
---

# bitop



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512//ms/_bitop/<destination key>`  
**Method:** `POST`  
**Method:**  
</p>
</blockquote>

```js
{
  "operation": "[AND|OR|XOR|NOT]",
  "keys": ["srckey1", "srckey2", "..."]
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
  "action": "bitop",
  "_id": "destination key",
  "body": {
    "operation": "[AND|OR|XOR|NOT]",
    "keys": ["srckey1", "srckey2", "..."]
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
  "action": "bitop",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<new destination key length>"
}
```

Performs a bitwise operation between multiple keys (containing string values) and stores the result in the destination key.

[[_Redis documentation_]](https://redis.io/commands/bitop)
