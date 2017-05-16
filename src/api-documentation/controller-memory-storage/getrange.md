---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: getrange
---

# getrange


<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_getrange/<key>?start=<start>&end=<end>`  
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
  "action": "getrange",
  "_id": "<key>",
  "start": "<start position>",
  "end": "<end position>"
}
```

>**Response**

```javascript
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "getrange",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<value substring>"
}
```

Returns a substring of a key's value.

[[_Redis documentation_]](https://redis.io/commands/getrange)
