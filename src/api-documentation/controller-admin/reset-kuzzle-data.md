---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: resetKuzzleData
---

# resetKuzzleData

{{{since "1.4.0"}}}


<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/admin/_resetKuzzleData`  
**Method:** `POST`
</p>
</blockquote>

<blockquote class="json">
<p>
**Query**
</p>
</blockquote>


```json
{
  "controller": "admin",
  "action": "resetKuzzleData"
}
```

>**Response**

```javascript
{
  "requestId": "d16d5e8c-464a-4589-938f-fd84f46080b9",
  "status": 200,
  "error": null,
  "controller": "admin",
  "action": "resetKuzzleData",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": { "acknowledge": true }
}
```

Asynchronously start the following sequence in Kuzzle, in this order:
* Invalidate and delete all users along with their credentials
* Delete all user-defined roles and profiles
* Reset the default roles and profiles to their default values
* Delete all document validation specifications

This action has no impact on Plugin and Document storage.

Subsequent calls made while a reset is underway will result in a [PreconditionError]({{ site_base_path }}api-documentation/errors#preconditionerror).  
