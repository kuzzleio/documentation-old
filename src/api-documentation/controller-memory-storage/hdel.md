---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: hdel
---


# hdel



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_hdel/<key>`  
**Method:** `DELETE`  
**Body:**
</p>
</blockquote>


```js
{
  "fields": ["field1", "field2", "..."]
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
  "action": "hdel",
  "_id": "<key>",
  "body": {
    "fields": ["field1", "field2", "..."]
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
  "action": "hdel",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<number of removed fields>"
}
```

Removes fields from a hash.

[[_Redis documentation_]](https://redis.io/commands/hdel)
