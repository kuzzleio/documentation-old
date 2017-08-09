---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: validate
---

# validate


<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/<index>/<collection>/_validate`  
**Method:** `POST`  
**Body:**
</p>
</blockquote>


```js
{
    // The message to send
}
```


<blockquote class="json">
<p>
**Query:**
</p>
</blockquote>


```json
{
  "index": "<index>",
  "collection": "<collection>",
  "controller": "document",
  "action": "validate",
  "body": {}
}
```

>**Response**

```javascript
{
  "status": 200,
  "error": null,
  "index": "<index>",
  "collection": "<collection>",
  "controller": "document",
  "action": "validate",
  "volatile": {},
  "result": {
    "errorMessages": {}, // There is no error messages
    "valid": true // The document complies with validation specifications
  }  
}
```

Validates data against existing validation rules. The data is not published nor stored by Kuzzle
If the document complies, the `result.valid` value is `true`, if not, it is `false`.
When the document does not complies, both `result.errorMessages` contains some very detailed hints on what is wrong with the document.
Note that if no validation specifications are set for the &lt;data index>/&lt;data collection>, the document always validate.
In any ways, the document is **not** stored nor published.
