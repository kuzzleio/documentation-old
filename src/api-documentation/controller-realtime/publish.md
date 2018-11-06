---
layout: side-code.html.hbs
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
<b>URL:</b> <code>http://kuzzle:7512/&lt;index&gt;/&lt;collection&gt;/_publish</code>  
<br><b>Method:</b> <code>POST</code>  
<br><b>Body:</b>
</p>
</blockquote>


```js
{
  "hello": 'world'
}
```



<blockquote class="json">
<p>
<b>Query</b>
</p>
</blockquote>


```json
{
  "index": "<index>",
  "collection": "<collection>",
  "controller": "realtime",
  "action": "publish",
  "volatile": {},
  "body": {
    "hello": "world"
  }
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
  "result": {
    "published": true
  }
}
```

Sends a real-time message to Kuzzle. The message will be dispatched to all the clients
who have subscribed using filters that match the message content.

The following metadata will be added to the message inside the `_kuzzle_info` property:
  - `createdAt`
  - `author`

<aside class="warning">
  The message is **not** persisted in the database.
</aside>
