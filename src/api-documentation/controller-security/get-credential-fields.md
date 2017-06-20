---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: getCredentialFields
---


# getCredentialFields



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/credentials/<strategy>/_fields`  
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
  "action": "getCredentialFields",
  "strategy": "<strategy>"
}
```

>**Response**

```javascript
// example with a "local" authentication

{
  "status": 200,                     
  "error": null,                     
  "action": "getCredentialFields",
  "controller": "security",
  "result": ["username", "password"]
}
```

Retrieve the list of accepted field names by the specified `<strategy>`. These fields might either be required or optional.
