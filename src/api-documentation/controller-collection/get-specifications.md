---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: getSpecifications
---

# getSpecifications


<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/<index>/<collection>/_specifications`  
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

Error response**

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

Allows to get the validation specifications associated to the given
index and collection if some specifications has been defined first.
