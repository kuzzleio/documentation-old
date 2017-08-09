---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: zadd
---

# zadd




<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_zadd/<key>`  
**Method:** `POST`  
**Body:**
</p>
</blockquote>


```js
{
  "elements": [
    {"score": "<score1>", "member": "<value1>"},
    {"score": "<score2>", "member": "<value2>"},
    {"score": "<...>", "member": "<...>"}
  ],

  // optional parameters
  "nx": "[false|true]",
  "xx": "[false|true]",
  "ch": "[false|true]",
  "incr": "[false|true]"
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
  "action": "zadd",
  "_id": "<key>",
  "body": {
    "elements": [
      {"score": "<score1>", "member": "<value1>"},
      {"score": "<score2>", "member": "<value2>"},
      {"score": "<...>", "member": "<...>"}
    ],

    "nx": "[false|true]",
    "xx": "[false|true]",
    "ch": "[false|true]",
    "incr": "[false|true]"
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
  "action": "zadd",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "<number of added elements>"
}
```

Adds the specified elements to the sorted set stored at `key`. If the key does not exist, it is created, holding an empty sorted set. If it already exists and does not hold a sorted set, an error is returned.

Scores are expressed as floating point numbers.

If a member to insert is already in the sorted set, its score is updated and the member is reinserted at the right position in the set.

Optional parameters may be provided to change the default behavior:

* `nx`: only add new elements, do not update existing ones
* `xx`: never add new elements, update only existing ones
* `ch`: instead of returning the number of added elements, returns the number of changes performed
* `incr`: instead of adding elements, increments the existing member with the provided `score`. Only one score/element pair can be specified if this option is set

[[_Redis documentation_]](https://redis.io/commands/zadd)
