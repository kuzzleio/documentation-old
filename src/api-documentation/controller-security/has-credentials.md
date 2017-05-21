---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: hasCredentials
---


# hasCredentials



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/credentials/<strategy>/<kuid>/_exists`  
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
  "action": "hasCredentials",
  "strategy": "<strategy>",
  "_id": "<kuid>"
}
```

>**Response**

```javascript
{
  "status": 200,                     
  "error": null,                     
  "action": "hasCredentials",
  "controller": "security",
  "_id": "<kuid>",
  "result": true
}
```

Check the existence of the specified `<strategy>`'s credentials for the user [`<kuid>`]({{ site_base_path }}guide/kuzzle-depth/authentication/#the-kuzzle-user-identifier-kuid).
