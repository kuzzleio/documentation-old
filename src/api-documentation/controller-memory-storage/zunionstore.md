---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: zunionstore
---

# zunionstore

{{{since "1.0.0"}}}




<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/ms/_zunionstore/&lt;key&gt;</code>  
<br><b>Method:</b> <code>POST</code>  
<br><b>Body:</b>
</p>
</blockquote>


```javascript
{
  "keys": ["key1", "key2", "..."],

  // optional parameters
  "weights": ["weight1", "weight2", "..."],
  "aggregate": "[sum|min|max]"
}
```



<blockquote class="json">
<p>
<b>Query</b>
</p>
</blockquote>


```json
{
  "controller": "ms",
  "action": "zunionstore",
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
  "action": "zunionstore",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<the number of elements in the new sorted set>"
}
```

Computes the union of the provided sorted sets given by the specified `keys`, and stores the result in a new sorted set at `key`.

Optional parameters:

* `weights`: specifies a multiplication factor for each input sorted set
* `aggregate` (default: `sum`): specifies how members' scores are aggregated during the intersection

[[_Redis documentation_]](https://redis.io/commands/zunionstore)
