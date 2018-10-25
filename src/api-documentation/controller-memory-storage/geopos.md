---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: geopos
---

# geopos

{{{since "1.0.0"}}}


<blockquote class="js">
<p>
<b>URL:</b> `http://kuzzle:7512/ms/_geopos/<key>?members=member1,member2,...`  
</br><b>Method:</b> `GET`
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

Returns the position (longitude, latitude) of the provided key's members (see [geoadd]({{ site_base_path }}api-documentation/controller-memory-storage/geoadd/)).  

[[_Redis documentation_]](https://redis.io/commands/geopos)
