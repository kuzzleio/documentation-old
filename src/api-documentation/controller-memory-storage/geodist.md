---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: geodist
---

# geodist


<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_geodist/<key>/<member1>/<member2>[?unit=[m|km|mi|ft]]`  
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
  "action": "geodist",
  "_id": "<key>",
  "member1": "first member name",
  "member2": "second member name",
  "unit": "(optional)[m|km|mi|ft]"
}
```

>**Response**

```javascript
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "geodist",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": <calculated distance>
}
```

Returns the distance between two geospatial members of a key (see [geoadd]({{ site_base_path }}api-documentation/controller-memory-storage/geoadd/)).  
The returned distance is expressed in meters by default.

[[_Redis documentation_]](https://redis.io/commands/geodist)
