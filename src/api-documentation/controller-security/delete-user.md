---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: deleteUser
---


# deleteUser



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/users/<kuid>`  
**Method:** `DELETE`
</p>
</blockquote>

<blockquote class="json">
<p>
**Query**
</p>
</blockquote>

```json
{
  "controller": "security",
  "action": "deleteUser",

  "_id": "<kuid>"
}
```

>**Response**

```javascript
{
  "status": 200,                     
  "error": null,                     
  "result": {
    "_id": "<kuid>",                  // The kuzzle user identifier
  }
  "index": "%kuzzle",
  "collection": "users",
  "action": "deleteUser",
  "controller": "security",
  "requestId": "<unique request identifier>"
}
```

Given a `user id`, deletes the corresponding [`<kuid>`]({{ site_base_path }}guide/kuzzle-depth/authentication/#the-kuzzle-user-identifier-kuid) from Kuzzle's database layer.
