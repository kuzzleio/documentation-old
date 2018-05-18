---
layout: side-code.html.handlebars
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: updateRoleMapping
---


# updateRoleMapping

{{{since "1.0.0"}}}



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

When it first initializes, Kuzzle defines a default mapping for the `roles` internal collection in the persistent data storage layer.

This mapping is intended to store the basic information of a role; typically the controllers and actions that the role grants access to.

But if you want to store more information about your roles, you can update the `roles` data mapping using Kuzzle's API and
ElasticSearch's [mapping capabilities](https://www.elastic.co/guide/en/elasticsearch/reference/5.x/mapping.html).
