---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: hset
---

# hset



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_hset/<key>`  
**Method:** `POST`  
**Body:**
</p>
</blockquote>


```js
{
  "field": "<field name>",
  "value": "<field value>"
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
  "action": "hset",
  "_id": "<key>",
  "body": {
    "field": "<field name>",
    "value": "<field value>"
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
  "action": "hset",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": [0|1]
}
```

Sets a field and its value in a hash. If the key does not exist, a new key holding a hash is created. If the field already exists, its value is overwritten.

[[_Redis documentation_]](https://redis.io/commands/hset)
