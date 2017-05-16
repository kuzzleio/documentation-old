---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: sadd
---

# sadd




<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_sadd/<key>`  
**Method:** `POST`  
**Body:**
</p>
</blockquote>


```js
{
  "members": ["member1", "member2", "..."]
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
  "action": "sadd",
  "_id": "<key>",
  "body": {
    "members": ["member1", "member2", "..."]
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
  "action": "sadd",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<number of elements added to the set>"
}
```

Adds members to a set of unique values stored at `key`. If the `key` does not exist, it is created beforehand.

[[_Redis documentation_]](https://redis.io/commands/sadd)
