---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: hsetnx
---

# hsetnx



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_hsetnx/<key>`  
**Method:** `POST`  
**Body:**
</p>
</blockquote>


```js
{
  "field": "<field name>",
  "value": "<field value>"
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
  "action": "hsetnx",
  "_id": "<key>",
  "body": {
    "field": "<field name>",
    "value": "<field value>"
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
  "action": "hsetnx",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "[0|1]"
}
```

Sets a field and its value in a hash, only if the field does not already exist.

[[_Redis documentation_]](https://redis.io/commands/hsetnx)
