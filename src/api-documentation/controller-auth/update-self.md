---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: updateSelf
---

# updateSelf

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

Updates the current User object in Kuzzle's database layer.

<aside class="notice">
  User must be connected in order to perform this action.
  The current user can not update its profile using this action.
  <a href="{{ site_base_path }}api-documentation/controller-security/update-user">Security / updateUser</a> must be used instead.
</aside>
