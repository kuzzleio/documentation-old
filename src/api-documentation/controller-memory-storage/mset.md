---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: mset
---

# mset



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_mset`  
**Method:** `POST`  
**Body:**
</p>
</blockquote>


```js
{
  "entries": [
    {"key": "<key1>", "value": "<value1>"},
    {"key": "<key2>", "value": "<value2>"},
    {"key": "...", "value": "..."}
  ]
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
  "action": "mset",
  "body": {
    "entries": [
      {"key": "<key1>", "value": "<value1>"},
      {"key": "<key2>", "value": "<value2>"},
      {"key": "...", "value": "..."}
    ]
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
  "action": "mset",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "OK"
}
```

Sets the provided keys to their respective values. If a key does not exist, it is created. Otherwise, the key's value is overwritten.

[[_Redis documentation_]](https://redis.io/commands/mset)
