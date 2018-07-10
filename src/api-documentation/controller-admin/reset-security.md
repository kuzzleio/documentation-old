---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: resetSecurity
---

# resetSecurity

{{{since "1.4.0"}}}


<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/admin/_resetSecurity`  
**Method:** `POST`
</p>
</blockquote>

<blockquote class="json">
<p>
**Query**
</p>
</blockquote>


```json
{
  "controller": "admin",
  "action": "resetSecurity"
}
```

>**Response**

```javascript
{
  "requestId": "d16d5e8c-464a-4589-938f-fd84f46080b9",
  "status": 200,
  "error": null,
  "controller": "admin",
  "action": "resetSecurity",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": { "acknowledge": true }
}
```

Asynchronously delete all users, profiles and roles and reset `anonymous`, `default` and `admin` profiles and roles to the default specified in Kuzzle's configuration files.
