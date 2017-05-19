---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: updateMapping
---

# updateMapping


<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/<index>/<collection>/_mapping`  
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
  "action": "updateMapping",

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
  "action": "updateMapping",
  "controller": "collection",
  "requestId": "<unique request identifier>",
  "result": {}
}
```

When creating a new data `collection` in the persistent data storage layer, Kuzzle uses a default mapping.

It means that, by default, you won't be able to exploit the full capabilities of our
persistent data storage layer (currently handled by [ElasticSearch](https://www.elastic.co/products/elasticsearch)),
and your searches may suffer from below-average performances, depending on the amount of data you
stored in a collection and the complexity of your database.

To solve this matter, Kuzzle's API offers a way to create data mapping and to expose the entire
[mapping capabilities of ElasticSearch](https://www.elastic.co/guide/en/elasticsearch/reference/5.x/mapping.html).
