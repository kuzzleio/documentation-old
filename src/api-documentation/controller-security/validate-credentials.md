---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: validateCredentials
---


# validateCredentials

{{{since "1.0.0"}}}

<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/credentials/<strategy>/<kuid>/_validate`  
**Method:** `POST`  
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
  "controller": "security",
  "action": "validateCredentials",
  "strategy": "<strategy>",
  "_id": "<kuid>",
  "body": {
    "credentialField": "someValue",
  }
}
```

```json
{
  "controller": "security",
  "action": "validateCredentials",
  "strategy": "local",
  "_id": "<kuid>",
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
  "action": "validateCredentials",
  "controller": "security",
  "_id": "<kuid>",
  "result": true
}
```

Validate credentials of the user with [`<kuid>`]({{ site_base_path }}guide/essentials/user-authentication/#kuzzle-user-identifier-kuid) for the specified `<strategy>`.  
This returns `true` if the provided credentials are valid, otherwise it returns an error. 

This route does not actually create or modify the user credentials. The credentials to send will depend on the authentication plugin and the authentication strategy used.

