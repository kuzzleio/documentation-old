---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: hsetnx
---

# hsetnx

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
<b>URL:</b> `http://kuzzle:7512/ms/_hsetnx/<key>`  
</br><b>Method:</b> `POST`  
**Body:**
</p>
</blockquote>


```js
{
  "field": "<field name>",
  "value": "<field value>"
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
  "action": "hsetnx",
  "_id": "<key>",
  "body": {
    "field": "<field name>",
    "value": "<field value>"
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
  "action": "hsetnx",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": [0|1]
}
```

Sets a field and its value in a hash, only if the field does not already exist.

[[_Redis documentation_]](https://redis.io/commands/hsetnx)
