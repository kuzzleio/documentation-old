---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: pfcount
---

# pfcount




<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_pfcount?keys=key1,key2,...`  
**Method:** `GET`
</p>
</blockquote>

<blockquote class="json">
<p>
**Query**
</p>
</blockquote>


```json
{
  "controller": "ms",
  "action": "pfcount",
  "keys": ["key1", "key2", "..."]
}
```

>**Response**

```javascript
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "pfcount",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<probabilistic cardinality>"
}
```

Returns the probabilistic cardinality of a [HyperLogLog](https://en.wikipedia.org/wiki/HyperLogLog) data structure, or of the merged HyperLogLog structures if more than 1 is provided (see [pfadd]({{ site_base_path }}api-documentation/controller-memory-storage/pfadd)).

[[_Redis documentation_]](https://redis.io/commands/pfcount)
