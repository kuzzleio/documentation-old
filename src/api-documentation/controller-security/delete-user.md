---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: deleteUser
---


# deleteUser

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
<b>URL:</b> `http://kuzzle:7512/users/<kuid>[?refresh=wait_for]`  
</br><b>Method:</b> `DELETE`
</p>
</blockquote>

<blockquote class="json">
<p>
<b>Query</b>
</p>
</blockquote>

```json
{
  "controller": "security",
  "action": "deleteUser",
  "refresh": "wait_for",

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

Given a `user id`, deletes the corresponding user from Kuzzle.

The optional parameter `refresh` can be used
with the value `wait_for` in order to wait for the user's deletion to be indexed (indexed users are available for `search`).
