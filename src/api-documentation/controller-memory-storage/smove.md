---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: smove
---

# smove




<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_smove/<key>`  
**Method:** `POST`  
**Body:**
</p>
</blockquote>


```js
{
  "destination": "<destination key>",
  "member": "<member>"
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
  "action": "smove",
  "_id": "<key>",
  "body": {
    "destination": "<destination key>",
    "member": "<member>"
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
  "action": "smove",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "[0|1]"
}
```

Moves a member from a set of unique values to another.

[[_Redis documentation_]](https://redis.io/commands/smove)
