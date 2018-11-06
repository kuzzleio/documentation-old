---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: sunionstore
---

# sunionstore

{{{since "1.0.0"}}}




<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/ms/_sunionstore</code>  
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
  "action": "sunionstore",
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
  "action": "sunionstore",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<number of members in the new set>"
}
```

Computes the union of multiple sets of unique values and stores it in a new set at `destination key`.

If the destination key already exists, it is overwritten.

[[_Redis documentation_]](https://redis.io/commands/sunionstore)
