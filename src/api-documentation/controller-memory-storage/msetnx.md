---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: msetnx
---

# msetnx




<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_msetnx`  
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
  "action": "msetnx",
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
  "action": "msetnx",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": [0|1]
}
```

Sets the provided keys to their respective values, only if they do not exist. If a key exists, then the whole operation is aborted and no key is set.

[[_Redis documentation_]](https://redis.io/commands/msetnx)
