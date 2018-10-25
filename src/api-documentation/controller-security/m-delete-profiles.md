---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: mDeleteProfiles
---


# mDeleteProfiles

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
<b>URL:</b> `http://kuzzle:7512/profiles/_mDelete[?refresh=wait_for]`  
</br><b>Method:</b> `POST`  
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
<b>Query</b>
</p>
</blockquote>

```json
{
  "controller": "security",
  "action": "mDeleteProfiles",
  "refresh": "wait_for",
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

Deletes a list of security `profile` objects from Kuzzle given a list of profile ids.

The optional parameter `refresh` can be used
with the value `wait_for` in order to wait for the profiles' deletion to be indexed (indexed profiles are available for `search`).
