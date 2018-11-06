---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: replaceUser
---

# replaceUser

{{{since "1.0.0"}}}

<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/users/&lt;kuid&gt;/_replace[?refresh=wait_for]</code>  
<br><b>Method:</b> <code>PUT</code>  
<br><b>Body</b>
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
<b>Query</b>
</p>
</blockquote>

```json
{
  "controller": "security",
  "action": "replaceUser",
  "refresh": "wait_for",
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

Given a [`<kuid>`]({{ site_base_path }}guide/essentials/user-authentication/#kuzzle-user-identifier-kuid), replaces the matching user object in Kuzzle.

The optional parameter `refresh` can be used
with the value `wait_for` in order to wait for the user to be indexed (indexed users are available for `search`).
