---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: sinterstore
---

# sinterstore

{{{since "1.0.0"}}}




<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/ms/_sinterstore</code>  
<br><b>Method:</b> <code>POST</code>  
<br><b>Body:</b>
</p>
</blockquote>


```js
{
  "destination": "<destination key>",
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
  "action": "sinterstore",
  "body": {
    "destination": "<destination key>",
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
  "action": "sinterstore",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<number of elements in the resulting set>"
}
```

Computes the intersection of the provided sets of unique values and stores the result in the `destination` key.

If the destination key already exists, it is overwritten.

[[_Redis documentation_]](https://redis.io/commands/sinterstore)
