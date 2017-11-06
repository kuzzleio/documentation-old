---
layout: side-code.html
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
**URL:** `http://kuzzle:7512/profiles/_mDelete[?refresh=wait_for]`  
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

Deletes a list of `profile` objects from Kuzzle's database layer given a list of profile ids.

The optional parameter `refresh` can be used
with the value `wait_for` in order to wait for the profiles' deletion indexation (indexed profiles are available for `search`).
