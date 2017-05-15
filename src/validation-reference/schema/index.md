---
layout: full.html
algolia: true
title: Schema Structure
description: understand Kuzzle validation mechanisms
order: 0
---

# Schema Structure

The validation schema must follow the following structure to be valid:

```json
{
  "myIndex": {
    "myCollection": {
      "strict": true,
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
      "validators": [
          "..."
      ]
    },
    "..."
  },
  "..."
}
```

Please refer below for a detailed overview of the available validations.
