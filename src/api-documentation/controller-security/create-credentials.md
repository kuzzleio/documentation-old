---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: createCredentials
---


# createCredentials

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/credentials/&lt;strategy&gt;/&lt;kuid&gt;/_create</code>  
<br><b>Method:</b> <code>POST</code>  
<br><b>Body</b>
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
<b>Query</b>
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

Create credentials for user [`<kuid>`]({{ site_base_path }}guide/essentials/user-authentication/#kuzzle-user-identifier-kuid) with the specified `<strategy>`. 
The credentials to send will depend on the authentication plugin and the authentication strategy.
