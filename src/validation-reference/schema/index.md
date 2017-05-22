---
layout: full.html
algolia: true
title: Schema Structure
description: understand Kuzzle validation mechanisms
order: 0
---

# Schema Structure

The validation schema must follow the following structure to be valid:

```js
{
  "myIndex": {
    "myCollection": {
      // If true, the document will be rejected if it attemps to
      // define new fields that have not been defined in the schema.
      "strict": true,

      // All documents will be rejected if they did not match theses fields validators
      "fields": {
        "fieldName": {
          "mandatory": true,
          "type": "string",
          "defaultValue": "a default value",
          "multivalued": {
            "value": true,
            "minCount": 1,
            "maxCount": 5
          },
          "typeOptions": {
            "length": {
              "min": 2,
              "max": 12
            }
          }
        },
        "anotherFieldName": {
          "..."
        },
        "myObjectField": {
          "type": "object",
          "..."
        },
        "myObjectField/mySubField": {
          "..."
        }
      },

      // Define custom conditional fields validators to reject document if they meet filters
      "validators": [
          "..."
      ]
    },
    "..."
  },
  "..."
}
```

Learn how to [create simple field validators]({{ site_base_path }}validation-reference/fields/fields/) and [complex validators]({{ site_base_path }}validation-reference/validators/)
