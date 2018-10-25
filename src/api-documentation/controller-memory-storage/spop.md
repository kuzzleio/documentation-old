---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: spop
---

# spop

{{{since "1.0.0"}}}




<blockquote class="js">
<p>
<b>URL:</b> `http://kuzzle:7512/ms/_spop/<key>`  
</br><b>Method:</b> `POST`  
**Body:**
</p>
</blockquote>


```js
{
  // optional
  "count": "<number of elements to remove>"
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
  "action": "spop",
  "_id": "<key>",
  "body": {
    "count": "<number of elements to remove>"
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
  "action": "spop",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<removed element>"
}
```

Removes and returns one or more elements at random from a set of unique values. If multiple elements are removed, the result set will be an array of removed elements, instead of a string.

[[_Redis documentation_]](https://redis.io/commands/spop)
