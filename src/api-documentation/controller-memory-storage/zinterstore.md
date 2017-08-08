---
layout: side-code.html
words:  144
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: zinterstore
---

# zinterstore




<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_zinterstore/<key>`  
**Method:** `POST`  
**Body:**
</p>
</blockquote>


```js
{
  "keys": ["key1", "key2", "..."],

  // optional parameters
  "weights": ["weight1", "weight2", "..."],
  "aggregate": "[sum|min|max]"
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
  "action": "zinterstore",
  "_id": "<key>",
  "body": {
    "keys": ["key1", "key2", "..."],

    "weights": ["weight1", "weight2", "..."],
    "aggregate": "[sum|min|max]"
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
  "action": "zinterstore",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<the number of elements in the new sorted set>"
}
```

Computes the intersection of the provided sorted sets given by the specified `keys`, and stores the result in a new sorted set at `key`.

Optional parameters:

* `weights`: specifies a multiplication factor for each input sorted set
* `aggregate` (default: `sum`): specifies how members' scores are aggregated during the intersection

[[_Redis documentation_]](https://redis.io/commands/zinterstore)
