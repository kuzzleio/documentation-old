---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: lrem
---


# lrem



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_lrem/<key>`  
**Method:** `DELETE`  
**Body:**
</p>
</blockquote>


```js
{
  "count": "<count>",
  "value": "<value to remove>"
}
```



<blockquote class="json">
<p>
**Query**
</p>
</blockquote>


```json
{
  "controller": "ms",
  "action": "lrem",
  "_id": "<key>",
  "body": {
    "count": "<count>",
    "value": "<value to remove>"
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
  "action": "lrem",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<number of removed elements>"
}
```

Removes the first `count` occurences of elements equal to `value` from a list.

[[_Redis documentation_]](https://redis.io/commands/lrem)
