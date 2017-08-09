---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: touch
---

# touch




<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_touch`  
**Method:** `POST`  
**Body:**
</p>
</blockquote>


```js
{
  "keys": ["key1", "key2", "..."]
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
  "action": "touch",
  "body": {
    "keys": ["key1", "key2", "..."]
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
  "action": "touch",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<number of touched keys>"
}
```

Alters the last access time of one or multiple keys. A key is ignored if it does not exist.

[[_Redis documentation_]](https://redis.io/commands/touch)
