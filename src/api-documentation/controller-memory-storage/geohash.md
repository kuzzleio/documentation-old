---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: geohash
---

# geohash

{{{since "1.0.0"}}}


<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/ms/_geohash/&lt;key&gt;?members=member1,member2,...</code>  
<br><b>Method:</b> <code>GET</code>
</p>
</blockquote>

<blockquote class="json">
<p>
<b>Query</b>
</p>
</blockquote>


```json
{
  "controller": "ms",
  "action": "geohash",
  "_id": "<key>",
  "members": ["member1", "member2", "..."]
}
```

>**Response**

```javascript
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "geohash",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": ["geohash1", "geohash2", "..."]
}
```

Returns a valid [geohash](https://en.wikipedia.org/wiki/Geohash) for the provided key's members (see [geoadd]({{ site_base_path }}api-documentation/controller-memory-storage/geoadd/)).  

[[_Redis documentation_]](https://redis.io/commands/geohash)
