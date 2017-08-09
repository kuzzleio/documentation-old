---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: getset
---

# getset



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_getset/<key>`  
**Method:** `POST`  
**Body:**
</p>
</blockquote>


```js
{
  "value": "new key value"
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
  "action": "getset",
  "_id": "<key>",
  "body": {
    "value": "new key value"
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
  "action": "getset",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "key's previous value"
}
```

Sets a new value for a key and returns the previous stored value.

[[_Redis documentation_]](https://redis.io/commands/getset)
