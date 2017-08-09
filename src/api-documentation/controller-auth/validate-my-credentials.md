---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: validateMyCredentials
---

# validateMyCredentials

<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/credentials/<strategy>/_me/_validate`  
**Method:** `POST`  
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
  "username": "MyUser",
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
  "action": "validateMyCredentials",
  "strategy": "<strategy>",
  "jwt": "<encrypted_jwt_token>",
  "body": {
    "username": "MyUser",
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
  "action": "validateMyCredentials",
  "controller": "auth",
  "result": true
}
```

Validate credentials of the specified `<strategy>` for the current user. `result` is true if provided credentials are valid; an error is triggered otherwise. This route does not actually create or modify the user credentials. The credentials to send depends entirely on the authentication plugin and strategy you want to create credentials for.
