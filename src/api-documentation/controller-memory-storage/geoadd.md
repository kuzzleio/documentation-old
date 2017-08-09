---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: geoadd
---

# geoadd



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_geoadd/<key>`    
**Method:** `POST`  
**Body:**
</p>
</blockquote>


```js
{
  "points": [
    {
      "lon": "<float between -180 and 180>",
      "lat": "<float between -85.05112878 and 85.05112878>",
      "name": "point name"
    },
    {
      "lon": "<float between -180 and 180>",
      "lat": "<float between -85.05112878 and 85.05112878>",
      "name": "point name"
    },
    ...
  ]
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
  "action": "geoadd",
  "_id": "<key>",
  "body": {
    "points": [
      {
        "lon": "<float between -180 and 180>",
        "lat": "<float between -85.05112878 and 85.05112878>",
        "name": "point name"
      },
      {
        "lon": "<float between -180 and 180>",
        "lat": "<float between -85.05112878 and 85.05112878>",
        "name": "point name"
      },
    ]
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
  "action": "geoadd",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<number of points added>"
}
```

Adds geospatial points to the specified key.

[[_Redis documentation_]](https://redis.io/commands/geoadd)
