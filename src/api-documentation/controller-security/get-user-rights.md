---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: getUserRights
---


# getUserRights



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/_users/<kuid>/_rights`  
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
  "action": "getUserRights",
  "_id": "<kuid>"
}
```


>**Response**

```javascript
{
  "status": 200,
  "error": null,
  "result": {
    // An array of objects containing the user rights
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

Given a `user id`, gets the matching user's rights from Kuzzle's dabatase layer.
