---
layout: full.html.handlebars
algolia: true
title: Filter Identifiers
description: How filter identifiers are generated
order: 10
---

# Filter Identifiers

Koncorde filter identifiers are generated from the filters provided in the DSL, this guarantees that different filters that match the same scope will have the same identifier. 

For example, both these filters will have the same filter identifier:

```json
{
  "and": [
    {
      "not": {
        "in": {"some_document_field": ["foo", "bar"]}
      }
    },
    {"missing": {"field": "another_field"}}
  ]
}
```

And:

```json
{
  "not": {
    "or": [
      {
        "or": [
          {"equals": {"some_document_field": "foo"}},
          {"equals": {"some_document_field": "bar"}}
        ]
      },
      {"exists": {"field": "another_field"}}
    ]
  }
}
```

For more information, please refer to the [Koncorde](https://www.npmjs.com/package/koncorde#filter-unique-identifier) documentation.
