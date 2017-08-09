---
layout: side-code.html
algolia: true
language-tab:
  json: HTTP
  js: Other protocols
title: unsubscribe
---


# unsubscribe


<blockquote class="json">
<p>
**Due to the synchronous nature of the HTTP protocol, real-time messaging is not supported.**
</p>
</blockquote>

<blockquote class="js">
<p>
**Query**
</p>
</blockquote>


```js
{
  "index": "<data index>",
  "collection": "<data collection>",
  "controller": "realtime",
  "action": "unsubscribe",

  "body": {
    "roomId": "<unique room ID>"
  },
  "volatile": {}
}
```



<blockquote class="js">
<p>
**Response**
</p>
</blockquote>



```js
{
  "status": 200,
  "error": null,
  "index": "<data index>",
  "collection": "<data collection>",
  "controller": "realtime",
  "action": "unsubscribe",
  "volatile": {}, // subscription volatile data
  "requestId": "<unique request identifier>",
  "result": {
    "roomId": "<unique Kuzzle room identifier>"
  }
}
```

Instructs Kuzzle to detach you from its subscribers for the given room.
In practice, your subscription won't receive any new message on the room once this action is triggered.

The expected parameter is the `roomId` that Kuzzle returned during the subscription.
