---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: getSpecifications
---

# getSpecifications

{{{since "1.0.0"}}}

<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/&lt;index&gt;/&lt;collection&gt;/_specifications</code>  
<br><b>Method:</b> <code>GET</code>
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
  "action": "getSpecifications",
}
```

>**Success response**

```javascript
{
  "status": 200,
  "error": null,
  "action": "getSpecifications",
  "controller": "collection",
  "collection": "<collection>",
  "index": "<index>",
  "result": {
    "collection": "<collection>",
    "index": "<index>",
    "validation": {
      "fields": {
        "myField": {
          "defaultValue": 42,
          "mandatory": true,
          "type": "integer"
        }
        ...
      },
      "strict": true
    }
  }
}
```

>**Error response**

```javascript
{
  "status": 404, // No validation specification has been set for this index/collection
  "error": {
    "_source": {
      "body": {}
    },
    "message": "Not Found"
  },
  "action": "getSpecifications",
  "controller": "collection",
  "index": "<index>",
  "collection": "<collection>"
  "result": null
}
```

Returns the validation specifications associated to the given index and collection.

### Possible errors

- [Common errors]({{ site_base_path }}api-documentation/errors/#common-errors)
- [NotFoundError]({{ site_base_path }}api-documentation/errors/#notfounderror)
