---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: rpoplpush
---

# rpoplpush




<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_rpoplpush`  
**Method:** `POST`  
**Body:**
</p>
</blockquote>


```js
{
  "source": "<key>",
  "destination": "<key>"
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
  "action": "rpoplpush",
  "body": {
    "source": "<key>",
    "destination": "<key>"
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
  "action": "rpoplpush",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<popped/pushed element>"
}
```

Removes the last element of the list at `source` and pushes it back at the start of the list at `destination`.

[[_Redis documentation_]](https://redis.io/commands/rpoplpush)
