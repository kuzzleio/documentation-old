---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: bitcount
---

# bitcount

{{{since "1.0.0"}}}

<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/ms/_bitcount/&lt;key&gt;[?start=&lt;integer&gt;&end=&lt;integer&gt;]</code>  
<br><b>Method:</b> <code>GET</code>  
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
  "action": "bitcount",
  "_id": "<key>",
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
  "action": "bitcount",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<count>"
}
```

Counts the number of set bits (population counting) in a string.  
The `start` and `end` parameters are optional.

[[_Redis documentation_]](https://redis.io/commands/bitcount)
