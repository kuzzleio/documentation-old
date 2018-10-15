---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: rpushx
---

# rpushx

{{{since "1.0.0"}}}




<blockquote class="js">
<p>
<b>URL:</b> `http://kuzzle:7512/ms/_rpushx/<key>`  
</br><b>Method:</b> `POST`  
**Body:**
</p>
</blockquote>


```js
{
  "value": "<value>"
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
  "action": "rpushx",
  "_id": "<key>",
  "body": {
    "value": "<value>"
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
  "action": "rpushx",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<updated number of elements in the list>"
}
```

Appends the specified value at the end of a list, only if the key already exists and if it holds a list.

[[_Redis documentation_]](https://redis.io/commands/rpushx)
