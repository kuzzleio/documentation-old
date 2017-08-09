---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: sdiffstore
---

# sdiffstore




<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_sdiffstore/<key>`  
**Method:** `POST`  
**Body:**
</p>
</blockquote>


```js
{
  "destination": "<key>",
  "keys": ["key1", "key2", "..."]
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
  "action": "sdiffstore",
  "_id": "<key>",
  "body": {
    "destination": "<key>",
    "keys": ["key1", "key2", "..."]
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
  "action": "sdiffstore",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<number of elements stored in the resulting set>"
}
```

Computes the difference between the set of unique values stored at `key` and the other provided sets, and stores the result in the key stored at `destination`.

If the destination key already exists, it is overwritten.

[[_Redis documentation_]](https://redis.io/commands/sdiffstore)
