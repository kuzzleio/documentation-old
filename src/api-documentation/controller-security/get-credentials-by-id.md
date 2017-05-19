---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: getCredentialsById
---


# getCredentialsById



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/credentials/<strategy>/<kuid>/_byId`  
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
  "action": "getCredentialsById",
  "strategy": "<strategy>",
  "_id": "<strategyId>"
}
```

>**Response**

```javascript
// example with a "local" authentication

{
  "status": 200,                     
  "error": null,                     
  "action": "getCredentialsById",
  "controller": "security",
  "_id": "<kuid>",
  "result": {
    "username": "MyUser",
    "kuid": "<kuid>"
  }
}
```

Get credential information of the specified `<strategyId>` (storage key of the strategy) of the user. Storage key and provided information completely depend of the strategy. The result can be an empty object.
