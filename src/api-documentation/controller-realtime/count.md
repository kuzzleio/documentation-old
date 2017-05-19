---
layout: side-code.html
algolia: true
language-tab:
  json: HTTP
  js: Other protocols
title: count
---


# count



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
  "controller": "realtime",
  "action": "count",
  "body": {
    "roomId": "unique room ID"
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
  "index": "<index>",
  "collection": "<collection>",
  "controller": "realtime",
  "action": "count",
  "requestId": "<unique request identifier>",
  "result": {
    "roomId": "<unique Kuzzle room identifier>",
    "count": "<number of subscriptions>",
  }
}
```

Returns the number of people/applications who have subscribed to the same documents as you have.

The expected parameter is the roomId returned by Kuzzle during the subscription.
