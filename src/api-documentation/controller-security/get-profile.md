---
layout: side-code.html.handlebars
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
**URL:** `http://kuzzle:7512/profiles/<profileId>`  
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
