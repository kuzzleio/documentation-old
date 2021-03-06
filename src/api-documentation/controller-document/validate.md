---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: validate
---

# validate

{{{since "1.0.0"}}}

<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/&lt;index&gt;/&lt;collection&gt;/_validate</code>  
<br><b>Method:</b> <code>POST</code>  
<br><b>Body:</b>
</p>
</blockquote>


```js
{
  // Document content to check
}
```


<blockquote class="json">
<p>
<b>Query:</b>
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

Validates data against existing validation rules. 

If the document is valid, the `result.valid` value is `true`, if not, it is `false`.
If the document is not valid, the `result.errorMessages` will contain detailed hints on what is wrong with the document.

Note that if no validation specifications are set for the `<data index>`/`<data collection>`, the document will always be valid.

This request does **not** store or publish the document.
