---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: keys
---


# keys



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_keys/<pattern>`  
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
  "action": "keys",
  "pattern": "<pattern>"
}
```

>**Response**

```javascript
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "keys",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": [
    "key1",
    "key2",
    "..."
  ]
}
```

Returns all keys matching the provided pattern.

[[_Redis documentation_]](https://redis.io/commands/keys)
