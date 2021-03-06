---
layout: side-code.html.hbs
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
<b>URL:</b> <code>http://kuzzle:7512/users/&lt;kuid&gt;/_update[?refresh=wait_for]</code>  
<br><b>Method:</b> <code>PUT</code>  
<br><b>Body</b>
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
<b>Query</b>
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

Given a [`<kuid>`]({{ site_base_path }}guide/essentials/user-authentication/#kuzzle-user-identifier-kuid), updates the matching user object in Kuzzler.

The optional parameter `refresh` can be used
with the value `wait_for` in order to wait for the user to be indexed (indexed users are available for `search`).
