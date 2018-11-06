---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: updateUserMapping
---


# updateUserMapping

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/users/_mapping</code>  
<br><b>Method:</b> <code>PUT</code>  
<br><b>Body:</b>
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
<b>Query</b>
</p>
</blockquote>

```json
{
  "controller": "security",
  "action": "updateUserMapping",

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
  "action": "updateUserMapping",
  "controller": "security",
  "requestId": "<unique request identifier>",
  "result": {
    "acknowledged": true
  },
}
```

When it first initializes, Kuzzle defines a default mapping for the `users` internal collection in the persistent data storage layer.

This mapping is intended to store the basic information for a user; typically, their credentials and security profiles.

But if you want to store more information about your users, you can update the `users` data mapping using Kuzzle's API and
ElasticSearch's [mapping capabilities](https://www.elastic.co/guide/en/elasticsearch/reference/5.x/mapping.html).
