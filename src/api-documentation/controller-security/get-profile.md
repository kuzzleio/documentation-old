---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: getProfile
---


# getProfile

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
<b>URL:</b> `http://kuzzle:7512/profiles/<profileId>`  
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
  "action": "getProfile",

  "_id": "<profileId>"
}
```

>**Response**

```javascript
{
  "status": 200,                     
  "error": null,                     
  "result": {
    "_id": "<profileId>",             // The profile id
    "_source": {                      // The requested profile
      ...
    },
    "index": "%kuzzle",
    "collection": "profiles"
    "action": "getProfile",
    "controller": "security",
    "requestId": "<unique request identifier>"
  }
}
```
Given a `profile id`, retrieves the corresponding security profile from the database.

<aside class="notice">
The security `profile id` is the same one you set when you create a security profile.
</aside>
