---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: resetKuzzleData
---

# resetKuzzleData

{{{since "1.4.0"}}}


<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/admin/_resetKuzzleData`  
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
  "action": "resetKuzzleData"
}
```

>**Response**

```javascript
{
  "requestId": "d16d5e8c-464a-4589-938f-fd84f46080b9",
  "status": 200,
  "error": null,
  "controller": "admin",
  "action": "resetKuzzleData",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": { "acknowledge": true }
}
```

Asynchronously execute the following actions on Kuzzle :
 - Reset all users, roles and profiles
 - Reset all validations
 - Reset plugins configuration
 - Reset Kuzzle configuration
