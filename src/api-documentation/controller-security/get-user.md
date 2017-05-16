---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: getUser
---


# getUser



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/users/<kuid>`  
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
  "action": "getUser",
  "_id": "<kuid>"
}
```

>**Response**

```javascript
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "index": "<index>",
  "collection": "<collection>",
  "controller": "security",
  "action": "getUser",
  "requestId": "<unique request identifier>",
  "result": {
    "_id": "<kuid>",
    "_source": {
      "profileIds": ["<profileId>"],
      ...                             // The user object content
    }
  }
}
```


Given a user [`<kuid>`](../guide/#the-kuzzle-user-identifier), gets the matching user from Kuzzle's dabatase layer.
