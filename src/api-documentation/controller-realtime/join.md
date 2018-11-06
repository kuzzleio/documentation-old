---
layout: side-code.html.hbs
algolia: true
language-tab:
  json: HTTP
  js: Other protocols
title: join
---


# join

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
<b>Response</b>
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
