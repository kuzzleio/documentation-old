---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: bitpos
---

# bitpos

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
<b>URL:</b> `http://kuzzle:7512/ms/_bitpos/<key>?bit=[0|1][&start=<integer>&end=<integer>]`  
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
  "action": "bitpos",
  "_id": "<key>",
  "bit": "[0|1]",
  "start": "<integer>",
  "end": "<integer>"
}
```

>**Response**

```javascript
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "bitpos",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<bit 1st position (integer)>"
}
```

Returns the position of the first bit set to 1 or 0 in a string, or in a substring.

[[_Redis documentation_]](https://redis.io/commands/bitpos)
