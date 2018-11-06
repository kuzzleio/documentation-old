---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: getMapping
---

# getMapping

{{{since "1.0.0"}}}

<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/&lt;index&gt;/&lt;collection&gt;/_mapping</code>  
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
  "action": "getMapping"
}
```

>**Response**

```javascript
{
  "status": 200,
  "error": null,
  "index": "<index>",
  "collection": "<collection>",
  "controller": "collection",
  "action": "getMapping",
  "requestId": "<unique request identifier>",
  "result": {
    "<index>": {
      "mappings": { // Data mapping using ElasticSearch mapping syntax
        "<collection>": {
          "properties": {
            "field1": {type: "field type", "...options..." },
            "field2": {type: "field type", "...options..." },
            ...
            "fieldn": {type: "field type", "...options..." },
          }
        }
      }
    }
  }
}
```

Returns the mapping for the given `collection`.

### Possible errors

- [Common errors]({{ site_base_path }}api-documentation/errors/#common-errors)
- [NotFoundError]({{ site_base_path }}api-documentation/errors/#notfounderror)
