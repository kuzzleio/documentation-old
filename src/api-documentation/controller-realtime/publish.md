---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: publish
---


# publish

{{{since "1.0.0"}}}


<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/<index>/<collection>/_publish`  
**Method:** `POST`  
**Body:**
</p>
</blockquote>


```js
{
  // The message to send
}
```



<blockquote class="json">
<p>
**Query**
</p>
</blockquote>


```json
{
  "index": "<index>",
  "collection": "<collection>",
  "controller": "realtime",
  "action": "publish",
  "volatile": {},
  "body": {}
}
```

>**Response**

```javascript
{
  "error": null,
  "status": 200,
  "index": "<index>",
  "collection": "<collection>",
  "controller": "realtime",
  "action": "publish",
  "volatile": {},
  "requestId": "<unique request identifier>",
  "result": {}
}
```

Sends a real-time message to Kuzzle Backend. The message will be dispatched to all the clients
who have subscribed using filters that match the message content.

<aside class="warning">
  The message is **not** persisted in the database.
</aside>
