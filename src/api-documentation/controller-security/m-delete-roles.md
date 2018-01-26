---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: mDeleteRoles
---


# mDeleteRoles

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/roles/_mDelete[?refresh=wait_for]`  
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
  "refresh": "wait_for",
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

Deletes a list of `roles` objects from Kuzzle Backend's database layer given a list of role ids.

The optional parameter `refresh` can be used
with the value `wait_for` in order to wait for the roles' deletion to be indexed (indexed roles are available for `search`).
