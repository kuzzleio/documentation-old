---
layout: full.html
algolia: true
title: ids
---

# ids

This filter returns only documents having their unique document ID listed in the provided list.

## Given the following documents:

```javascript
{
  _id: 'a',
  firstName: 'Grace',
  lastName: 'Hopper'
},
{
  _id: 'b',
  firstName: 'Ada',
  lastName: 'Lovelace'
},
{
  _id: 'c',
  firstName: 'Marie',
  lastName: 'Curie'
}
```

## The following filter validates first document:

```javascript
ids: {
  values: ['a']
}
```
