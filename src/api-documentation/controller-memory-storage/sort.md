---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: sort
---

# sort




<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_sort/<key>`  
**Method:** `POST`  
**Body:**
</p>
</blockquote>


```js
{
  // optional arguments
  "alpha": "[false|true]",
  "by": "<external key pattern>",
  "direction": "[ASC|DESC]",
  "get": ["pattern1", "pattern2", "..."],
  "limit": ["<offset>", "<count>"],
  "store": "<destination key>"
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
  "action": "sort",
  "_id": "<key>",
  "body": {
    "alpha": "[false|true]",
    "by": "<external key pattern>",
    "direction": "[ASC|DESC]",
    "get": ["pattern1", "pattern2", "..."],
    "limit": ["<offset>", "<count>"],
    "store": "<destination key>"
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
  "action": "sort",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": [
    "sorted element1",
    "sorted element2",
    "..."
  ]
}
```

Sorts and returns elements contained in a list, a set of unique values or a sorted set.  
By default, sorting is numeric and elements are compared by their value interpreted as double precision floating point number.

Optional arguments may be provided:

* `alpha`: performs an alphanumerical sort instead of a numeric one
* `by`: instead of sorting by values directly, sorts by values contained in external keys, using a pattern completed by values of the list/set/sorted set to sort
* `direction`: sort in ascendant or descendant order
* `get`: instead of returning the sorted values directly, returns the values contained in external keys, using patterns completed by the sorted values
* `limit`: limits the result set to a range of matching elements (similar to _SELECT LIMIT offset, count_ in SQL). Format: `[<offset(int)>, <count(int)>]`
* `store`: instead of returning the result set, stores it in a list at `destination` key

[[_Redis documentation_]](https://redis.io/commands/sort)
