---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: sunionstore
---

# sunionstore




<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_sunionstore`  
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
  "action": "sunionstore",
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
  "action": "sunionstore",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<number of members in the new set>"
}
```

Computes the union of multiple sets of unique values and stores it in a new set at `destination key`.

If the destination key already exists, it is overwritten.

[[_Redis documentation_]](https://redis.io/commands/sunionstore)
