---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: bitcount
---

# bitcount



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_bitcount/<key>[?start=<integer>&end=<integer>]`  
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
  "action": "bitcount",
  "_id": "<key>",
  "start": "<integer>",
  "end": "<integer>"
}
```

>**Response**

```javascript
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "bitcount",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<count>"
}
```

Counts the number of set bits (population counting) in a string.  
The `start` and `end` parameters are optional.

[[_Redis documentation_]](https://redis.io/commands/bitcount)
