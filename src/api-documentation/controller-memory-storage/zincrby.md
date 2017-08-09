---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: zincrby
---

# zincrby




<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_zincrby/<key>`  
**Method:** `POST`  
**Body:**
</p>
</blockquote>


```js
{
  "member": "<member>",
  "value": "<increment>"
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
  "action": "zincrby",
  "_id": "<key>",
  "body": {
    "member": "<member>",
    "value": "<increment>"
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
  "action": "zincrby",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": <new score value>
}
```

Increments the score of a `member` in a sorted set by the provided `value`.

[[_Redis documentation_]](https://redis.io/commands/zincrby)
