---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: lset
---

# lset



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_lset/<key>`  
**Method:** `POST`  
**Body:**
</p>
</blockquote>


```js
{
  "index": "<index>",
  "value": "<value>"
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
  "action": "lset",
  "_id": "<key>",
  "body": {
    "index": "<index>",
    "value": "<value>"
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
  "action": "lset",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "OK"
}
```

Sets the list element at `index` with the provided value.

[[_Redis documentation_]](https://redis.io/commands/lset)
