---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: getProfile
---


# getProfile



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/_profiles/<profileId>`  
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
Given a `profile id`, retrieves the corresponding profile from the database.

<aside class="notice">
The profile unique identifier. It's the same you set when you create a profile.
</aside>
