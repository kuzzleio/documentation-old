---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: object
---

# object




<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_object/<key>?subcommand=[refcount|encoding|idletime]`  
**Method:** `GET`
</p>
</blockquote>

<blockquote class="json">
<p>
**Query**
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
