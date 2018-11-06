---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: hmset
---

# hmset

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/ms/_hmset/&lt;key&gt;</code>  
<br><b>Method:</b> <code>POST</code>  
<br><b>Body:</b>
</p>
</blockquote>


```js
{
  "entries": [
    {"field": "<field1 name>", "value": "<field1 value>"},
    {"field": "<field2 name>", "value": "<field2 value>"},
    {"field": "<...>", "value": "<...>"}
  ]
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
  "action": "hmset",
  "_id": "<key>",
  "body": {
    "entries": [
      {"field": "<field1 name>", "value": "<field1 value>"},
      {"field": "<field2 name>", "value": "<field2 value>"},
      {"field": "<...>", "value": "<...>"}
    ]
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
  "action": "hmset",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "OK"
}
```

Sets multiple fields at once in a hash.

[[_Redis documentation_]](https://redis.io/commands/hmset)
