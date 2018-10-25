---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: randomkey
---

# randomkey

{{{since "1.0.0"}}}




<blockquote class="js">
<p>
<b>URL:</b> `http://kuzzle:7512/ms/_randomkey`  
</br><b>Method:</b> `GET`  
**Body:**
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
  "action": "randomkey"
}
```

>**Response**

```javascript
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "randomkey",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<one of the database's key, at random>"
}
```

Returns a random key from the memory storage.

[[_Redis documentation_]](https://redis.io/commands/randomkey)
