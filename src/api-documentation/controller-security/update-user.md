---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: updateUser
---


# updateUser

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/users/<kuid>/_update[?refresh=wait_for]`  
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
  "refresh": "wait_for",
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

Given a [`<kuid>`]({{ site_base_path }}guide/essentials/user-authentication/#kuzzle-user-identifier-kuid), updates the matching User object in Kuzzle's database layer.

The optional parameter `refresh` can be used
with the value `wait_for` in order to wait for the user indexation (indexed users are available for `search`).
