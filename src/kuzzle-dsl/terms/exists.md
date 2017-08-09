---
layout: full.html
algolia: true
title: exists
---

# exists

The `exists` filter matches documents containing non-null fields.

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
  hobby: 'computer'
}
```

## The following filter validates the first document:

```javascript
{
  exists: {
    field: 'alive'
  }
}
```
