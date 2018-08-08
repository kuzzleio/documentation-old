---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: create
---

# create

{{{since "1.3.0"}}}

<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/<index>/<collection>`  
**Method:** `PUT`  
**Body:**  
</p>
</blockquote>

```js
{
  // Data mapping using ElasticSearch mapping syntax
  "properties": {
    "field1": {
      "type": "field type",
      "other": "...options..."
    },
    "field2": {
      "type": "field type",
      "other": "...options..."
    },
    ...
    "fieldn": {
      "type": "field type",
      "other": "...options..."
    }
  }
}
```

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
  "action": "create",

  "body": {
    "properties": {
      "field1": {
        "type": "field type",
        "...options..."
      },
      "field2": {
        "type": "field type",
        "...options..."
      },
      "fieldn": {
        "type": "field type",
        "...options..."
      }
    }
  }
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
  "action": "create",
  "requestId": "<unique request identifier>",
  "result": {
    "acknowledged": true
  }
}
```

Creates a new [collection]({{ site_base_path }}guide/essentials/persisted) in Kuzzle via the persistence engine, in the provided `index`.  
You can also provide an optional body with a data mapping that allow you to exploit the full capabilities of our
persistent data storage layer, [ElasticSearch](https://www.elastic.co/products/elasticsearch) (check here the [mapping capabilities of ElasticSearch](https://www.elastic.co/guide/en/elasticsearch/reference/5.x/mapping.html)).  

This method will only update the mapping if the collection already exists.

### Possible errors

- [Common errors]({{ site_base_path }}api-documentation/errors/#common-errors)
- [PreconditionError]({{ site_base_path }}api-documentation/errors/#preconditionerror)
