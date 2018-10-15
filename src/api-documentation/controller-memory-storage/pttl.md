---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: pttl
---

# pttl

{{{since "1.0.0"}}}




<blockquote class="js">
<p>
<b>URL:</b> `http://kuzzle:7512/ms/_pttl/<key>`  
</br><b>Method:</b> `GET`
</p>
</blockquote>

<blockquote class="json">
<p>
<b>Query</b>
</p>
</blockquote>


```json
{
  "controller": "ms",
  "action": "pttl",
  "_id": "<key>"
}
```

>**Response**

```javascript
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "pttl",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<remaining time to live, in milliseconds>"
}
```

Returns the remaining time to live of a key, in milliseconds.

[[_Redis documentation_]](https://redis.io/commands/pttl)
