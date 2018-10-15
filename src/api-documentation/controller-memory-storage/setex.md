---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: setex
---

# setex

{{{since "1.0.0"}}}




<blockquote class="js">
<p>
<b>URL:</b> `http://kuzzle:7512/ms/_setex/<key>`  
</br><b>Method:</b> `POST`  
**Body:**
</p>
</blockquote>


```js
{
  "value": "<value>",
  "seconds": "<time to live>"
}
```



<blockquote class="json">
<p>
<b>Query</b>
</p>
</blockquote>


```json
{
  "controller": "ms",
  "action": "setex",
  "_id": "<key>",
  "body": {
    "value": "<value>",
    "seconds": "<time to live>"
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
  "action": "setex",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "OK"
}
```

Sets a value and a time to live (in seconds) on a key. If the key already exists, it is overwritten.

[[_Redis documentation_]](https://redis.io/commands/setex)
