---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: randomkey
---

# randomkey




<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_randomkey`  
**Method:** `GET`  
**Body:**
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
