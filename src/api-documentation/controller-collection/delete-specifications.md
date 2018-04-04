---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: deleteSpecifications
---

# deleteSpecifications

{{{since "1.0.0"}}}

<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/<index>/<collection>/_specifications`  
**Method:** `DELETE`
</p>
</blockquote>

<blockquote class="json">
<p>
**Query**
</p>
</blockquote>

```json
{
  "index": "<index>",
  "collection": "<collection>",
  "controller": "collection",
  "action": "deleteSpecifications",
}
```

>**Response**

```javascript
{
  "status": 200,
  "error": null,
  "index": "<index>",
  "collection": "<collection>",
  "action": "deleteSpecifications",
  "controller": "collection",
  "result": true
}
```

Deletes the validation specification for the <index>/<collection>.
It returns a `status` of 200 even if no validation specification exists.

***Note:***  by default, an empty specification is implicitly applied to all collections. In a way, "no specification set" means "all documents are valid". This is why there is no error when we make this request and no specifications exist.
