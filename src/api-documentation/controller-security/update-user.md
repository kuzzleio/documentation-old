---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: updateUser
---


# updateUser



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/users/<kuid>/_update`  
**Method:** `PUT`  
**Body**
</p>
</blockquote>

```js
{
    "foo": "bar", // Some properties to update
    "name": "Walter Smith",
    ...
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
  "action": "updateUser",
  "_id": "<kuid>",
  "body": {
    "foo": "bar",    
    "name": "Walter Smith",
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
  "action": "updateUser",
  "controller": "security",
  "requestId": "<unique request identifier>",
  "result": {
    "_id": "<kuid>",
    "_index": "%kuzzle",
    "_type": "users",
    "_version": 2
  }
}
```

Given a [`<kuid>`]({{ site_base_path }}guide/kuzzle-depth/authentication/#the-kuzzle-user-identifier-kuid), updates the matching User object in Kuzzle's database layer.
