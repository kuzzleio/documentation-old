---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: object
---

# object

{{{since "1.0.0"}}}




<blockquote class="js">
<p>
<b>URL:</b> `http://kuzzle:7512/ms/_object/<key>?subcommand=[refcount|encoding|idletime]`  
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
  "action": "object",
  "_id": "<key>",
  "subcommand": "[refcount|encoding|idletime]"
}
```

>**Response**

```javascript
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "object",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": <object inspection result>
}
```

Inspects the low-level properties of a key.

[[_Redis documentation_]](https://redis.io/commands/object)
