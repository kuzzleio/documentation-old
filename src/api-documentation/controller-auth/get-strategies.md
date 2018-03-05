---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: getStrategies
---

# getStrategies

{{{since "1.0.0"}}}

<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/strategies`  
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
  "controller": "auth",
  "action": "getStrategies"
}
```

>**Response**

```javascript
// example with a "local" and "facebook" strategy

{
  "status": 200,
  "error": null,
  "action": "getStrategies",
  "controller": "auth",
  "result": [
    "local",
    "facebook"
  ]
}
```

Get all authentication strategies registered in Kuzzle
