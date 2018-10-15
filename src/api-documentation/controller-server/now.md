---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: now
---

# now

{{{since "1.0.0"}}}


<blockquote class="js">
<p>
<b>URL:</b> `http://kuzzle:7512/_now`  
</br><b>Method:</b> `GET`
</p>
</blockquote>

<blockquote class="json">
<p>
**Query:**
</p>
</blockquote>

```json
{
  "controller": "server",
  "action": "now"
}
```

>**Response**

```javascript
{
  "status": 200,                     
  "error": null,                     
  "controller": "server",
  "action": "now",
  "requestId": "<unique request identifier>",
  "result": {
    "now": 1447151167622              // Epoch time
  }
}
```

Returns the current Kuzzle UTC timestamp as Epoch time (number of `milliseconds` elapsed since `1 January 1970 00:00:00`).
