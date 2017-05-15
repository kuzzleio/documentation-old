---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: sinterstore
---

# sinterstore




<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_sinterstore`  
**Method:** `POST`  
**Body:**
</p>
</blockquote>


```js
{
  "destination": "<destination key>",
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
  "action": "sinterstore",
  "body": {
    "destination": "<destination key>",
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
  "action": "sinterstore",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<number of elements in the resulting set>"
}
```

Computes the intersection of the provided sets of unique values and stores the result in the `destination` key.

If the destination key already exists, it is overwritten.

[[_Redis documentation_]](https://redis.io/commands/sinterstore)
