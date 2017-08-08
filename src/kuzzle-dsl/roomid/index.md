---
layout: full.html
words:  85
algolia: true
title: Room Identifiers
description: How room identifiers are generated
order: 0
---

# Room identifiers

Kuzzle Room identifiers are calculated from the filters provided to the DSL, guaranteeing that differently written filters matching the same scope will get the same identifier.

For instance, both these filters will get the same room identifier:

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
