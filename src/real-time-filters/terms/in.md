---
layout: full.html
algolia: true
title: in
---

# in

This filter allows testing a string field against multiple possibilities.

## Given the following documents:

```javascript
{
  firstName: 'Grace',
  lastName: 'Hopper'
},
{
  firstName: 'Ada',
  lastName: 'Lovelace'
},
{
  firstName: 'Marie',
  lastName: 'Curie'
}
```

## The following filter validates the first two documents:

```javascript
in: {
  firstName: ['Grace', 'Ada']
}
```
