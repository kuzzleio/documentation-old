---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: zremrangebyrank
---

# zremrangebyrank




<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_zremrangebyrank/<key>`  
**Method:** `DELETE`  
**Body:**
</p>
</blockquote>


```js
{
  "start": "<index start>",
  "stop": "<index stop>"
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
  "action": "zremrangebyrank",
  "_id": "<key>",
  "body": {
    "start": "<index start>",
    "stop": "<index stop>"
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
  "action": "zremrangebyrank",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<number of removed members>"
}
```

Removes members from a sorted set with their position in the set between `start` and `stop` (inclusive).

Positions are 0-based, meaning the first member of the set has a position of 0.

[[_Redis documentation_]](https://redis.io/commands/zremrangebyrank)
