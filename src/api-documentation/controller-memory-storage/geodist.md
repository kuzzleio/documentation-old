---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: geodist
---

# geodist

{{{since "1.0.0"}}}


<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/ms/_geodist/&lt;key&gt;/&lt;member1&gt;/&lt;member2&gt;[?unit=[m|km|mi|ft]]</code>  
<br><b>Method:</b> <code>GET</code>
</p>
</blockquote>

<blockquote class="json">
<p>
<b>Query</b>
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
