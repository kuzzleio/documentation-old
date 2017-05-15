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
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "action": "hasCredentials",
  "controller": "security",
  "_id": "<kuid>",
  "result": true
}
```

Check the existence of the specified `<strategy>`'s credentials for the user [`<kuid>`](../guide/#the-kuzzle-user-identifier).
