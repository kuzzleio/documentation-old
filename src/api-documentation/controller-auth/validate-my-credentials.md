---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: validateMyCredentials
---

# validateMyCredentials

{{{since "1.0.0"}}}

<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/credentials/&lt;strategy&gt;/_me/_validate</code>  
<br><b>Method:</b> <code>POST</code>  
<br><b>Headers:</b> <code>Authorization: "Bearer &lt;encrypted_jwt_token&gt;"</code>  
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

Validate the current user's credentials for the specified `<strategy>`. The `result` field is `true` if the provided credentials are valid; otherwise an error is triggered.

This route does not actually create or modify the user's credentials. The credentials to send will depend on the authentication plugin and authentication strategy.
