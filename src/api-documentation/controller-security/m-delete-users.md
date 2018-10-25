---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: mDeleteUsers
---


# mDeleteUsers

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
<b>URL:</b> `http://kuzzle:7512/users/_mDelete[?refresh=wait_for]`  
</br><b>Method:</b> `POST`  
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
<b>Query</b>
</p>
</blockquote>

```json
{
  "controller": "security",
  "action": "mDeleteUsers",
  "refresh": "wait_for",
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

Deletes a list of `users` objects from Kuzzle given a list of [`<kuids>`]({{ site_base_path }}guide/essentials/user-authentication/#kuzzle-user-identifier-kuid).

The optional parameter `refresh` can be used
with the value `wait_for` in order to wait for the users' deletion to be indexed (indexed users are available for `search`).
