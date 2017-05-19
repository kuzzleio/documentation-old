---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: getAllCredentialFields
---


# getAllCredentialFields



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/credentials/_fields`  
**Method:** `GET`  
</p>
</blockquote>

<blockquote class="json">
<p>
**Query**
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
