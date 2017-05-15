---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: decrby
---

# decrby



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_decrby/<key>`  
**Method:** `POST`  
**Body:**  
</p>
</blockquote>

```js
{
  "value": "<decrement value>"
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
  "action": "decrby",
  "_id": "<key>",
  "body": {
    "value": "<decrement value>"
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
  "action": "decrby",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<updated key value>"
}
```

Decrements the number stored at `key` by a provided integer value. If the key does not exist, it is set to 0 before performing the operation.

[[_Redis documentation_]](https://redis.io/commands/decrby)
