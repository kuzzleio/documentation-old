---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: ltrim
---

# ltrim



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_ltrim/<key>`  
**Method:** `POST`  
**Body:**
</p>
</blockquote>


```js
{
  "start": "<start>",
  "stop": "<stop>"
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
  "action": "ltrim",
  "_id": "<key>",
  "body": {
    "start": "<start>",
    "stop": "<stop>"
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
  "action": "ltrim",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "OK"
}
```

Trims an existing list so that it will contain only the specified range of elements specified.

[[_Redis documentation_]](https://redis.io/commands/ltrim)
