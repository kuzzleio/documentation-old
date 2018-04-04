---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: updateSelf
---

# updateSelf

{{{since "1.0.0"}}}

<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/_updateSelf`  
**Method:** `PUT`  
**Headers:** `Authorization: "Bearer <encrypted_jwt_token>"`  
**Body**
</p>
</blockquote>

<section class="http"></section>

```js
{
    "foo": "bar",  // Some properties to update
    "name": "Walter Smith",
    ...
}
```

<blockquote class="json">
<p>
**Query**
</p>
</blockquote>

```json
{
  "controller": "auth",
  "action": "updateSelf",
  "jwt": "<encrypted_jwt_token>",
  "body": {
    "foo": "bar",        
    "name": "Walter Smith",
  }
}
```

>**Response**

```javascript
{
  "status": 200,
  "error": null,
  "action": "updateSelf",
  "controller": "auth",
  "volatile": {},
  "requestId": "<unique request identifier>",
  "result": {
    "_id": "<kuid>",// The kuzzle user identifier
    "_source": {
      "foo": "bar",
      "name": "Walter Smith",
      ....
    }
  }
}
```

Updates the current user object in Kuzzle.

<aside class="notice">
  The user must be logged in to perform this action.
  The current user cannot update their security profile using this action. To change a user's security profile use 
  <a href="{{ site_base_path }}api-documentation/controller-security/update-user">Security / updateUser</a> instead.
</aside>
