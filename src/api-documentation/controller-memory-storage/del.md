---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: del
---


<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/ms</code>  
<br><b>Method:</b> <code>DELETE</code>  
<br><b>Method:</b>  
</p>
</blockquote>

```js
{
  "keys": ["key1", "key2", "..."]
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
  "action": "del",
  "body": {
    "keys": ["key1", "key2", "..."]
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
  "action": "del",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<number of deleted keys>"
}
```

Deletes a list of keys.

[[_Redis documentation_]](https://redis.io/commands/del)
