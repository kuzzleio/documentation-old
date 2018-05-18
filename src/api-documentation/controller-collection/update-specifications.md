---
layout: side-code.html.handlebars
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: updateSpecifications
---

# updateSpecifications

<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/_specifications`  
**Method:** `PUT`  
**Body:**
</p>
</blockquote>


```js
{
  "myindex": {
    "mycollection": {
      "strict": <true|false>,
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
  "controller": "collection",
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
  "action": "updateSpecifications",
  "controller": "collection",
  "result": {
    "myindex": {
      "mycollection": {
        "strict": "<true|false>",
        "fields": {
// ... specification for each field
        }
      }
    }
  }
}

{
  "status": 400, // There was an error on specification
  "action": "updateSpecifications",
  "controller": "collections",
  "error": {
    "_source": // ... given specifications,
    "message": {
      "description": // ...global error description,
      "details": // ... an array of detailed problem found,
      "valid": false // the specifications are not valid
    }
  },
  "volatile": {},
  "result": {
    "myindex": {
      "mycollection": {
        "strict": "<true|false>",
        "fields": {
          "myField": {
// ... specification with an error
          }
        }
      }
    }
  }
}
```

You can specify validation specifications in order to enforce your own rules over documents and real-time messages.
Whenever a document is stored or updated, or a message is published, Kuzzle applies these specifications to check if the new data complies to the defined rules. If not, the document or message will be rejected and the request will return an error message.

The updateSpecifications method allows you to create or update the validation specifications for one or more index/collection pairs.

When the validation specification is not formatted correctly, a detailed error message is returned to help you to debug.
