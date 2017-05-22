---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: updateCredentials
---


# updateCredentials



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/credentials/<strategy>/<kuid>/_update`  
**Method:** `PUT`  
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
  "controller": "security",
  "action": "updateCredentials",
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
  "action": "updateCredentials",
  "strategy": "<strategy>",
  "_id": "<kuid>",
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
  "action": "updateCredentials",
  "controller": "security",
  "_id": "<kuid>",
  "result": {
    "username": "MyUser",
    "kuid": "<kuid>"
  }
}
```

Updates credentials of the specified `<strategy>` for the user [`<kuid>`]({{ site_base_path }}guide/kuzzle-depth/authentication/#the-kuzzle-user-identifier-kuid). The credentials to send depends entirely on the authentication plugin and strategy you want to create credentials for.
