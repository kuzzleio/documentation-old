---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: srandmember
---

# srandmember

{{{since "1.0.0"}}}




<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/ms/_srandmember/&lt;key&gt;[?count=&lt;count&gt;]</code>  
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
