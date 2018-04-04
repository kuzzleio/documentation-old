---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: getCredentials
---


# getCredentials

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/credentials/<strategy>/<kuid>`  
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
  "action": "getCredentials",
  "strategy": "<strategy>",
  "_id": "<kuid>"
}
```

>**Response**

```javascript
// example with a "local" authentication

{
  "status": 200,
  "error": null,
  "action": "getCredentials",
  "controller": "security",
  "_id": "<kuid>",
  "result": {
    "username": "MyUser",
    "kuid": "<kuid>"
  }
}
```

Get credential information of user with [`<kuid>`]({{ site_base_path }}guide/essentials/user-authentication/#kuzzle-user-identifier-kuid) for the specified `<strategy>`. The returned `result` object will vary depending on the strategy and can be empty.
