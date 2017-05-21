---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: geopos
---

# geopos



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_geopos/<key>?members=member1,member2,...`  
**Method:** `GET`
</p>
</blockquote>


<blockquote class="json">
<p>
**Query**
</p>
</blockquote>


```javascript
{
  "controller": "ms",
  "action": "geopos",
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
  "action": "geopos",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": [
    ["<longitude of member1>", "<latitude of member1>"],
    ["<longitude of member2>", "<latitude of member2>"],
    ["<longitude of ...>", "<latitude of ...>"]
  ]
}
```

Returns the positions (longitude, latitude) of the provided key's members (see [geoadd]({{ site_base_path }}api-documentation/controller-memory-storage/geoadd/)).  

[[_Redis documentation_]](https://redis.io/commands/geopos)
