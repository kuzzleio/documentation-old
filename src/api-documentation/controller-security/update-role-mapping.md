---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: updateRoleMapping
---


# updateRoleMapping



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/roles/_mapping`  
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
  "controller": "security",
  "action": "updateRoleMapping",

  "body": {
    "properties": {
      "field1": {
        "type": "field type",
        "other": "...options..."
      },
      "field2": {
        "type": "field type",
        "other": "...options..."
      },
      "fieldn": {
        "type": "field type",
        "other": "...options..."
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
  "action": "updateRoleMapping",
  "controller": "security",
  "requestId": "<unique request identifier>",
  "result": {
    "acknowledged": true
  },
}
```

At the first initialization, Kuzzle defines a default mapping for the `roles` internal collection in the persistent data storage layer.

This mapping is intended to store the basic information of a role; typically, its allowed controllers and actions.

But if you want to store more information about your roles, Kuzzle's API offers a way to update the `roles` data mapping using the
[mapping capabilities of ElasticSearch](https://www.elastic.co/guide/en/elasticsearch/reference/5.x/mapping.html).
