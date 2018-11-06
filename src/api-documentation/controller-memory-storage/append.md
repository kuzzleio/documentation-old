---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: append
---

# append

{{{since "1.0.0"}}}

<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/ms/_append/&lt;key&gt;</code>  
<br><b>Method:</b> <code>POST</code>  
<br><b>Body:</b>
</p>
</blockquote>


```js
{
  "value": "value to be appended to the key"
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
  "action": "append",
  "_id": "<key>",
  "body": {
    "value": "value to be appended to the key"
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
  "action": "append",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<new value length after the append operation>"
}
```

Appends a value to a key. If the key does not exist, it is created.

[[_Redis documentation_]](https://redis.io/commands/append)
