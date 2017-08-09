---
layout: side-code.html
algolia: true
language-tab:
  json: HTTP
  js: Other protocols
title: join
---


# join



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
  "index": "<index>",
  "collection": "<collection>",
  "controller": "realtime",
  "action": "join",
  "body": {
    "roomId": "<the room identifier to join>"
  },
  "volatile": {},
  "scope": "<all|in|out|none>",
  "state": "<all|pending|done>",
  "users": "<all|in|out|none>"
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
  "index": "<index>",
  "collection": "<collection>",
  "controller": "realtime",
  "action": "subscribe",
  "volatile": {}, // subscription volatile data
  "requestId": "<unique request identifier>",
  "result": {
    "roomId": "<unique Kuzzle room identifier>"
  }
}
```

Joins a previously created subscription.

The `roomId` parameter is returned by Kuzzle when [subscribing]({{ site_base_path }}api-documentation/controller-realtime/subscribe/) to some documents.
