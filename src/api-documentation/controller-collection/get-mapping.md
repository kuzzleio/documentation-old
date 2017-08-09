---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: getMapping
---

# getMapping


<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/<index>/<collection>/_mapping`  
**Method:** `GET`
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

Gets the mapping of the given `collection`.
