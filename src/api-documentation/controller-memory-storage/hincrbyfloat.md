---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: hincrbyfloat
---

# hincrbyfloat



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_hincrbyfloat/<key>`  
**Method:** `POST`  
**Body:**
</p>
</blockquote>


```js
{
  "field": "field name",
  "value": "<increment value>"
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
  "action": "hincrbyfloat",
  "_id": "<key>",
  "body": {
    "field": "field name",
    "value": "<increment value>"
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
  "action": "hincrbyfloat",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<new field value>"
}
```

Increments the number stored in a hash field by the provided float value.

[[_Redis documentation_]](https://redis.io/commands/hincrbyfloat)
