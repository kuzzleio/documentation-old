---
layout: full.html
algolia: true
title: Testing nested fields
description: How to test nested fields
order: 20
---

# Testing nested fields

Examples described in this documentation show how to test for fields at the root of provided data objects, but it is also possible to add filters on nested properties.

To do that, instead of giving the name of the property to test, its path must be supplied, in the following manner: `path.to.property`

**Example:**

Given the following document:

```json
{
    "name": {
        "first": "Grace",
        "last": "Hopper"
    }
}
```

Here is a filter, testing for equality on the field `last` in the `name` sub-object:

```json
{
    "equals": {
        "name.last": "Hopper"
    }
}
```
