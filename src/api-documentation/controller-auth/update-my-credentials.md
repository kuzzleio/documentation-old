---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: updateMyCredentials
---

# updateMyCredentials

<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/credentials/<strategy>/_me/_update`  
**Method:** `PUT`  
**Headers:** `Authorization: "Bearer <encrypted_jwt_token>"`  
**Body**
</p>
</blockquote>

```js
{
  "credentialField": "someValue",
  ...
}

// example with a "local" authentication

{
  "password": "MyPassword"
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
  "action": "updateMyCredentials",
  "strategy": "<strategy>",
  "jwt": "<encrypted_jwt_token>",
  "body": {
    "password": "MyPassword"
  }
}
```

>**Response**

```javascript
// example with a "local" authentication

{
  "status": 200,
  "error": null,
  "action": "updateMyCredentials",
  "controller": "auth",
  "result": {
    "username": "MyUser",
    "kuid": "<kuid>"
  }
}
```

Create credentials of the specified `<strategy>` for the current user. The credentials to send depends entirely on the authentication plugin and strategy you want to create credentials for.
