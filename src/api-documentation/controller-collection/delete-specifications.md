---
layout: side-code.html.hbs
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
<b>URL:</b> <code>http://kuzzle:7512/&lt;index&gt;/&lt;collection&gt;/_specifications</code>  
<br><b>Method:</b> <code>DELETE</code>
</p>
</blockquote>

<blockquote class="json">
<p>
<b>Query</b>
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

### Possible errors

- [Common errors]({{ site_base_path }}api-documentation/errors/#common-errors)
