---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: mDeleteProfiles
---


# mDeleteProfiles



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/profiles/_mDelete`  
**Method:** `POST`  
**Body:**
</p>
</blockquote>


```js
{
  // ids must be an array of profile ids
  "ids": ["myFirstProfile", "mySecondProfile"]
}
```

<blockquote class="json">
<p>
**Query**
</p>
</blockquote>

```json
{
  "controller": "security",
  "action": "mDeleteProfiles",
  "body": {
    "ids": ["myFirstProfile", "mySecondProfile"]
  }
}
```

>**Response**

```javascript
{
  "status": 200,
  "error": null,
  "action": "mDeleteProfiles",
  "controller": "security",
  "requestId": "<unique request identifier>",
  "result": [
    "myFirstProfile",
    "mySecondProfile"
  ]
}
```

Deletes a list of `profile` objects from Kuzzle's database layer given a list of profile ids.
