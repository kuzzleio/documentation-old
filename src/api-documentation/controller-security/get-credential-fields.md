---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: getCredentialFields
---


# getCredentialFields

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/credentials/&lt;strategy&gt;/_fields</code>  
<br><b>Method:</b> <code>GET</code>  
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
