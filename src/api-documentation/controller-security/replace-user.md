---
layout: side-code.html
words: 109
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: replaceUser
---

# replaceUser

<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/users/<kuid>/_replace`  
**Method:** `PUT`  
**Body**
</p>
</blockquote>

```js
{
  "profileIds": ["<profileId>"],          // Mandatory. The profile ids for the user
  "name": "John Doe",                     // Additional optional User properties
  // ...
}
```

<blockquote class="json">
<p>
**Query**
</p>
</blockquote>

```json
{
  "controller": "security",
  "action": "replaceUser",
  "_id": "<kuid>",
  "body": {
    "profileIds": ["<profileId>"],
    "name": "John Doe"
  }
}
```

>**Response**

```javascript
{
  "status": 200,
  "error": null,
  "index": "%kuzzle",
  "collection": "users",
  "action": "replaceUser",
  "controller": "security",
  "requestId": "<unique request identifier>",
  "result": {
    "_id": "<kuid>",
    "_source": {
      "profileIds": ["<profileId>"],
      "name": "John Doe"
    }
  }
}
```

Given a [`<kuid>`]({{ site_base_path }}guide/essentials/user-authentication/#kuzzle-user-identifier-kuid), replaces the matching User object in Kuzzle's database layer.
