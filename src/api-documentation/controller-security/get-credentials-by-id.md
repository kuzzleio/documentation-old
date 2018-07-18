---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: getCredentialsById
---


# getCredentialsById

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/credentials/<strategy>/<userId>/_byId`  
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
  "_id": "<userId>"
}
```

>**Response**

```javascript
// example with the "local" authentication plugin

{
  "status": 200,
  "error": null,
  "action": "getCredentialsById",
  "controller": "security",
  "result": {
    "username": "<userId>",
    "kuid": "<kuid>"
  }
}
```

Get credential information for the user identified by the strategy's unique user identifier `userId`.  
The returned `result` object will vary depending on the strategy (see the [getById plugin function]({{ site_base_path }}plugins-reference/plugins-features/adding-authentication-strategy/#the-getbyid-function)) and can be empty.

**Note:** as shown in the code example, the `userId` identifier is specific to the specified strategy. If you wish to get credential information using a [`<kuid>`]({{ site_base_path }}guide/essentials/user-authentication/#kuzzle-user-identifier-kuid) identifier, use the [getCredentials]({{ site_base_path }}api-documentation/controller-security/get-credentials/) API route instead.
