---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: srandmember
---

# srandmember




<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_srandmember/<key>[?count=<count>]`  
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
  "action": "srandmember",
  "_id": "<key>",
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
  "action": "srandmember",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<member value>"
}
```

Returns one or more members of a set of unique values, at random.  
If `count` is provided and is positive, the returned values are unique. If `count` is negative, a set member can be returned multiple times.

If more than 1 member is returned, the result set will be an array of values instead of a string.

[[_Redis documentation_]](https://redis.io/commands/srandmember)
