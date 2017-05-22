---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: deleteSpecifications
---

# deleteSpecifications


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
  "result": {}
}
```

Deletes the validation specification set for the <index>/<collection>.
It responds 200 even there where no validation specification manually set before.

***Note:*** by default, an empty specification is implicitally applied to all collections which. In a way, "no specification set" means "all documents are valid". This is why, using this route when no specifications have been set before, does not produce an error.
