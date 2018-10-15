---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: getAllCredentialFields
---


# getAllCredentialFields

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
<b>URL:</b> `http://kuzzle:7512/credentials/_fields`  
</br><b>Method:</b> `GET`  
</p>
</blockquote>

<blockquote class="json">
<p>
<b>Query</b>
</p>
</blockquote>

```json
{
  "controller": "security",
  "action": "getAllCredentialFields"
}
```

>**Response**

```javascript
// example with a "local" authentication

{
  "status": 200,                     
  "error": null,                     
  "action": "getAllCredentialFields",
  "controller": "security",
  "result": {
    "local": ["username", "password"],
    ...
  }
}
```

Retrieve a list of accepted fields per authentication strategy. These fields might either be required or optional.
