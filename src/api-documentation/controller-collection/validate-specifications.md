---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: validateSpecifications
---

# validateSpecifications

{{{since "1.0.0"}}}

<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/_validateSpecifications`  
**Method:** `POST`  
**Body:**
</p>
</blockquote>


```js
{
  "myindex": {
    "mycollection": {
      "strict": "<true|false>",
      "fields": {
        // ... specification for each field
      }
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
  "controller": "admin",
  "action": "updateSpecifications",

  "body": {
    "myindex": {
      "mycollection": {
        "strict": "<true|false>",
        "fields": {}
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
  "controller": "admin",
  "state": "done",
  "requestId": "<unique request identifier>",
  "result": {
    "valid": "<true|false>",
    "details": [ // it some errors have been found
 // each spotted errors
    ],
    "description": "<string>" // global description if validation fails
  }
}
```

You can specify validation specifications in order to enforce your own rules over documents and real-time messages.
Whenever a document is stored or updated, or a message is published, Kuzzle applies these specifications to check if the new data complies to the defined rules. If not, the document or message will be rejected and the request will return an error message.

The validateSpecifications method checks if a validation specification is well formatted. It does not store nor modify the existing specification.

When the validation specification is not formatted correctly, a detailed error message is returned to help you to debug.
