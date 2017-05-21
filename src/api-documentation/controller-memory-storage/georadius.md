---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: georadius
---

# georadius



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_georadius/<key>?lon=<longitude>&lat=<latitude>&distance=<distance>&unit=[m|km|mi|ft][&options=option1,option2,...]`  
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
 "action": "georadius",
 "_id": "<key>",
 "lon": "<longitude>",
 "lat": "<latitude>",
 "distance": "<distance>",
 "unit": "[m|km|mi|ft]",
 "options": ["(optional)", "option1", "option2", "..."]
}
```

>**Response**

```javascript
{
 "requestId": "<unique request identifier>",
 "status": 200,
 "error": null,
 "controller": "ms",
 "action": "georadius",
 "collection": null,
 "index": null,
 "volatile": null,
 "result": [
   "member1",
   "member2",
   "..."
 ]
}
```

Returns the members (added with [geoadd]({{ site_base_path }}api-documentation/controller-memory-storage/geoadd/)) of a given key inside the provided geospatial radius.

The `options` parameter accepts the following options: `withcoord`, `withdist`, `count <count>`, `asc` and `desc`.  
The provided count value for the `count` option must be passed as a separate option.  
For instance, `&options=count,<count>` for HTTP requests, or `options: ['count', <count>]` for other protocols.

The `result` format may change if `options` parameters are provided: instead of an array of value, the result may instead be an array of arrays (for instance with `withdist` or `withcoord` options).

[[_Redis documentation_]](https://redis.io/commands/georadius)
