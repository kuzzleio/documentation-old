---
layout: full.html
algolia: true
title: Validators
description: learn how to create complex validators
order: 2
---

# Validators

The `validators` property is an array of [DSL filters](../real-time-filters). Each filters have to match in order for the document to be valid.

<aside class="warning">You have to take care about the fields you allow to be empty or undefined.</aside>

## Structure

```json
{
  "myIndex": {
    "myCollection": {
      "strict": true,
      "fields": {
        "..."
      },
      "validators": [
        { "equals": { "fieldName": "maximilian"} },
        {
          "bool": {
            "must": [
              "..."
            ],
            "must_not": [
              "..."
            ],
            "should": [
              "..."
            ],
            "should_not": [
              "..."
            ]
          }
        },
        "..."
      ]
    },
    "..."
  },
  "..."
}
```

Translates in the following DSL query:

```json
{
  "bool": {
    "must": [
      { "equals": { "fieldName": "maximilian"} },
      {
        "bool": {
          "must": [
            "..."
          ],
          "must_not": [
            "..."
          ],
          "should": [
            "..."
          ],
          "should_not": [
            "..."
          ]
        }
      },
      "..."
    ]
  }
}
```
