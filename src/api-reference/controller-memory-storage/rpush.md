---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: rpush
---

# rpush




<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_rpush/<key>`  
**Method:** `POST`  
**Body:**
</p>
</blockquote>


```js
{
  "values": ["value1", "value2", "..."]
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
  "action": "rpush",
  "_id": "<key>",
  "body": {
    "values": ["value1", "value2", "..."]
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
  "action": "rpush",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": <updated number of elements in the list>
}
```

Appends the specified values at the end of a list. If the key does not exist, it is created holding an empty list before performing the operation.

[[_Redis documentation_]](https://redis.io/commands/rpush)
