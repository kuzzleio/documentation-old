---
layout: full.html
algolia: true
title: range
---

# range

Filters documents with fields having number attributes within a certain range.

The range filter accepts the following parameters:

`gte` Greater-than or equal to

`gt` Greater-than

`lte` Less-than or equal to

`lt` Less-than

## Given the following documents:

```javascript
{
  firstName: 'Grace',
  lastName: 'Hopper',
  age: 85,
  city: 'NYC',
  hobby: 'computer'
},
{
  firstName: 'Ada',
  lastName: 'Lovelace',
  age: 36
  city: 'London',
  hobby: 'computer'
},
{
  firstName: 'Marie',
  lastName: 'Curie',
  age: 55,
  city: 'Paris',
  hobby: 'radium'
}
```

## The following filter validates the last two documents:

```javascript
range: {
  age: {
    gte: 36,
    lt: 85
  }
}
```
