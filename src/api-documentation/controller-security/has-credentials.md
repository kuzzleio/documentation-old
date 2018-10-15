---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: hasCredentials
---


# hasCredentials

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
<b>URL:</b> `http://kuzzle:7512/credentials/<strategy>/<kuid>/_exists`  
</br><b>Method:</b> `GET`  
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

Check the existence of a user's (with [`<kuid>`]({{ site_base_path }}guide/essentials/user-authentication/#kuzzle-user-identifier-kuid)) credentials for the specified `<strategy>`.
