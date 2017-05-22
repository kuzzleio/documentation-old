---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: hmset
---

# hscan



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_hscan/<key>?cursor=<cursor>[&match=<pattern>][&count=<count>]`  
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
  "action": "hscan",
  "_id": "<key>",
  "cursor": "<cursor>",

  "match": "<pattern>",
  "count": "<count>"
}
```

>**Response**

```javascript
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "hscan",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": [
    "<new cursor position>",
    [
      "field1",
      "value of field1",
      "field2",
      "value of field2",
      "..."
    ]
  ]
}
```

Identical to [scan]({{ site_base_path }}api-documentation/controller-memory-storage/scan), except that `hscan` iterates the fields contained in a hash.


[[_Redis documentation_]](https://redis.io/commands/hscan)
