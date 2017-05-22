---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: mDeleteUsers
---


# mDeleteUsers



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/users/_mDelete`  
**Method:** `POST`  
**Body:**
</p>
</blockquote>


```js
{
  // ids must be an array of profile ids
  "ids": ["firstKuid", "secondKuid"]
}
```

<blockquote class="json">
<p>
**Query**
</p>
</blockquote>

```json
{
  "controller": "security",
  "action": "mDeleteUsers",
  "body": {
    "ids": ["firstKuid", "secondKuid"]
  }
}
```

>**Response**

```javascript
{
  "status": 200,                     
  "error": null,                     
  "action": "mDeleteUsers",
  "controller": "security",
  "requestId": "<unique request identifier>",
  "result": [
    "firstKuid",
    "secondKuid"
   ]
  }
}
```

Deletes a list of `users` objects from Kuzzle's database layer given a list of [`<kuids>`]({{ site_base_path }}guide/kuzzle-depth/authentication/#the-kuzzle-user-identifier-kuid).
