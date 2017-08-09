---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: mDeleteRoles
---


# mDeleteRoles



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/roles/_mDelete`  
**Method:** `POST`  
**Body:**
</p>
</blockquote>


```js
{
  // ids must be an array of profile ids
  "ids": ["myFirstRole", "mySecondRole"]
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
  "action": "mDeleteRoles",
  "body": {
    "ids": ["myFirstRole", "mySecondRole"]
  }
}
```

>**Response**

```javascript
{
  "status": 200,
  "error": null,
  "action": "mDeleteRoles",
  "controller": "security",
  "requestId": "<unique request identifier>",
  "result": [
    "myFirstRole",
    "mySecondRole"
  ]
}
```

Deletes a list of `roles` objects from Kuzzle's database layer given a list of role ids.
