---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: exists
---

# exists


<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_exists?keys=key1,key2,...`  
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
  "action": "exists",
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
  "action": "exists",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<number of existing keys>"
}
```

Checks if the specified keys exist in the database.

[[_Redis documentation_]](https://redis.io/commands/exists)
