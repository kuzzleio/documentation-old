---
layout: full.html
algolia: true
title: Filter Identifiers
description: How filter identifiers are generated
order: 10
---

# Filter identifiers

Koncorde filter identifiers are calculated from the filters provided to the DSL, guaranteeing that differently written filters matching the same scope will get the same identifier.

For instance, both these filters will get the same filter identifier:

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

For more information, please check [Koncorde documentation](https://www.npmjs.com/package/koncorde#filter-unique-identifier)
