---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: createCredentials
---


# createCredentials



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/credentials/<strategy>/<kuid>/_create`  
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
  "action": "createCredentials",
  "strategy": "<strategy>",
  "_id": "<kuid>",
  "body": {
    "credentialField": "someValue"
  }
}
```

```json
{
  "controller": "security",
  "action": "createCredentials",
  "strategy": "<strategy>",
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
  "action": "createCredentials",
  "controller": "security",
  "_id": "<kuid>",
  "result": {
    "username": "MyUser",
    "kuid": "<kuid>"
  }
}
```

Create credentials of the specified `<strategy>` for the user [`<kuid>`]({{ site_base_path }}guide/kuzzle-depth/authentication/#the-kuzzle-user-identifier-kuid). The credentials to send depends entirely on the authentication plugin and strategy you want to create credentials for.
