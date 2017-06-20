---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: now
---

# now


<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/_now`  
**Method:** `GET`
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
