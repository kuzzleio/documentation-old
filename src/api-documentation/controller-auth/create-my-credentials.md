---
layout: side-code.html.handlebars
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: createMyCredentials
---

# createMyCredentials

{{{since "1.0.0"}}}

<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/credentials/<strategy>/_me/_create`  
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
  "action": "createMyCredentials",
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
  "action": "createMyCredentials",
  "controller": "auth",
  "result": {
    "username": "MyUser",
    "kuid": "<kuid>"
  }
}
```

Create the current user's credentials for the specified `<strategy>`. The credentials to send will depend on the authentication plugin and the authentication strategy.
