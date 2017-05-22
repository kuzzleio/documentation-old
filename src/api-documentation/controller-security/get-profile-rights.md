---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: getProfileRights
---


# getProfileRights



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/_profiles/<profileId>/_rights`  
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
  "action": "getProfileRights",

  "_id": "<profileId>"
}
```

>**Response**

```javascript
{
  "status": 200,
  "error": null,
  "result": {
    // An array of objects containing the profile rights
    "hits": [
      {
        "controller": "<ctrl_name|*>",
        "action": "<action_name|*>",
        "index": "<index_name|*>",
        "collection": "<collection_name|*>",
        "value": "<allowed|denied|conditional>"
      },
      {
        // Another rights item... and so on
      }
    ]
  }
}
```

Given a `profile id`, retrieves the corresponding rights.

<aside class="notice">
The profile unique identifier. It's the same you set when you create a profile.
in its responses when you create a profile.
</aside>
