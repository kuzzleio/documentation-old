---
layout: full.html
algolia: true
title: missing
---

# missing

A filter matching documents with a missing field.

## Given the following documents:

```javascript
{
  firstName: 'Grace',
  lastName: 'Hopper',
  city: 'NYC',
  hobby: 'computer',
  alive: false
},
{
  firstName: 'Ada',
  lastName: 'Lovelace',
  city: 'London',
  hobby: 'computer',
}
```

## The following filter validates the second document:

```javascript
{
  missing: {
    field: 'alive'
  }
}
```
