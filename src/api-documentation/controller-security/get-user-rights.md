---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: getUserRights
---


# getUserRights

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
<b>URL:</b> `http://kuzzle:7512/users/<kuid>/_rights`  
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

Given a `user id`, gets the matching user's rights from Kuzzle.
