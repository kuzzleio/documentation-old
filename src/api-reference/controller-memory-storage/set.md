---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: set
---

# set




<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/ms/_set/<key>`  
**Method:** `POST`  
**Body:**
</p>
</blockquote>


```js
{
  "value": "<value>",

  // the following arguments are all optional
  "ex": "<seconds>",
  "px": "<milliseconds>",
  "nx": "[false|true]",
  "xx": "[false|true]"
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
  "action": "set",
  "_id": "<key>",
  "body": {
    "value": "<value>",

    "ex": "<seconds>",
    "px": "<milliseconds>",
    "nx": "[false|true]",
    "xx": "[false|true]"
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
  "action": "set",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": "OK"
}
```

Creates a key holding the provided value, or overwrites it if it already exists.

Additional options can be provided:

* `ex`: set the specified expire time, in seconds
* `px`: set the specified expire time, in milliseconds
* `nx`: only set the key if it does not already exist
* `xx`: only set the key if it already exists

**Note:** setting `ex` and `px` options lead to a `BadRequestError` as these options are mutually exclusive. Same thing goes for `nx` and `xx`.

[[_Redis documentation_]](https://redis.io/commands/set)
