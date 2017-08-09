---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: del
---


<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms`  
**Method:** `DELETE`  
**Method:**  
</p>
</blockquote>

```js
{
  "keys": ["key1", "key2", "..."]
}
```



<blockquote class="json">
<p>
**Query**
</p>
</blockquote>


```json
{
  "controller": "ms",
  "action": "del",
  "body": {
    "keys": ["key1", "key2", "..."]
  }
}
```

>**Response**

```javascript
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "del",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<number of deleted keys>"
}
```

Deletes a list of keys.

[[_Redis documentation_]](https://redis.io/commands/del)
