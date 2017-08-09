---
layout: full.html
words: 182
algolia: true
title: Specification structure
description: understand Kuzzle validation mechanisms
order: 0
---

# Specification structure

When a collection is created, its specification is empty. As a result, any document validates the specification.

In order to update the specification, you can use the [updateSpecifications action]({{ site_base_path }}api-documentation/controller-collection/update-specifications/).

Here is an example of a fully described specification:

```js
const specification = {
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
          "...": "..."
        },
        "myObjectField": {
          "type": "object",
          "...": "..."
        },
        "myObjectField/mySubField": {
          "...": "..."
        }
      },

      // Define custom conditional fields validators to reject document if they meet filters
      "validators": [
        "..."
      ]
    },
    "...": "..."
  },
  "...": "..."
}
```

Learn how to [create simple field validators]({{ site_base_path }}validation-reference/fields/fields/) and [complex validators]({{ site_base_path }}validation-reference/validators/).
