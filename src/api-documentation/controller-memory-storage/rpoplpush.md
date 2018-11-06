---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: rpoplpush
---

# rpoplpush

{{{since "1.0.0"}}}




<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/ms/_rpoplpush</code>  
<br><b>Method:</b> <code>POST</code>  
<br><b>Body:</b>
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
<b>Query</b>
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
