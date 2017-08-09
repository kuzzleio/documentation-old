---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: getbit
---

# getbit


<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_getbit/<key>?offset=<offset>`  
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
  "action": "getbit",
  "_id": "<key>",
  "offset": "<offset>"
}
```

>**Response**

```javascript
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "getbit",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": [0|1]
}
```

Returns the bit value at `offset`, in the string value stored in a key.

[[_Redis documentation_]](https://redis.io/commands/getbit)
