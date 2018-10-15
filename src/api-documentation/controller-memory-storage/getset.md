---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: getset
---

# getset

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
<b>URL:</b> `http://kuzzle:7512/ms/_getset/<key>`  
</br><b>Method:</b> `POST`  
**Body:**
</p>
</blockquote>


```js
{
  "value": "new key value"
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
  "action": "getset",
  "_id": "<key>",
  "body": {
    "value": "new key value"
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
  "action": "getset",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "key's previous value"
}
```

Sets a new value for a key and returns the previous stored value.

[[_Redis documentation_]](https://redis.io/commands/getset)
