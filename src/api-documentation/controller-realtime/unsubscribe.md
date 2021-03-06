---
layout: side-code.html.hbs
algolia: true
language-tab:
  json: HTTP
  js: Other protocols
title: unsubscribe
---


# unsubscribe

{{{since "1.0.0"}}}


<blockquote class="json">
<p>
<b>Due to the synchronous nature of the HTTP protocol, real-time messaging is not supported.</b>
</p>
</blockquote>

<blockquote class="js">
<p>
<b>Query</b>
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
<b>Response</b>
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

Instructs Kuzzle to remove a subscription from the specified room.
Your subscription won't receive any new messages from the room once this action is triggered.

The expected parameter is the `roomId` that Kuzzle returned during the subscription.
