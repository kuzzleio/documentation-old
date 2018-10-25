---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: sdiff
---

# sdiff

{{{since "1.0.0"}}}




<blockquote class="js">
<p>
<b>URL:</b> `http://kuzzle:7512/ms/_sdiff/<key>?keys=key1,key2,...`  
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
  "action": "sdiff",
  "_id": "<key>",
  "keys": ["key1", "key2", "..."]
}
```

>**Response**

```javascript
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "sdiff",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": [
    "diff value1",
    "diff value2",
    "..."
  ]
}
```

Returns the difference between the set of unique values stored at `key` and the other provided sets.

[[_Redis documentation_]](https://redis.io/commands/sdiff)
