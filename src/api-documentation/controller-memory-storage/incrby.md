---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: incrby
---

# incrby

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
<b>URL:</b> `http://kuzzle:7512/ms/_incrby/<key>`  
</br><b>Method:</b> `POST`  
**Body:**
</p>
</blockquote>


```js
{
  "value": "<increment value>"
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
  "action": "incrby",
  "_id": "<key>",
  "body": {
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
  "action": "incrby",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<updated key value>"
}
```

Increments the number stored at `key` by the provided integer value. If the key does not exist, it is set to 0 before performing the operation.

[[_Redis documentation_]](https://redis.io/commands/incrby)
