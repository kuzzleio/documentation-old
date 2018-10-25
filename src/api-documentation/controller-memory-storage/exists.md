---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: exists
---

# exists

{{{since "1.0.0"}}}


<blockquote class="js">
<p>
<b>URL:</b> `http://kuzzle:7512/ms/_exists?keys=key1,key2,...`  
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
