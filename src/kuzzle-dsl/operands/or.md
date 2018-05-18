---
layout: full.html.handlebars
algolia: true
title: or
---

# or

{{{since "1.0.0"}}}

The `or` filter takes an array containing filter objects, combining them using OR operands.

## Given the following documents:

```javascript
{
  firstName: 'Grace',
  lastName: 'Hopper',
  city: 'NYC',
  hobby: 'computer'
},
{
  firstName: 'Ada',
  lastName: 'Lovelace',
  city: 'London',
  hobby: 'computer'
},
{
  firstName: 'Marie',
  lastName: 'Curie',
  city: 'Paris',
  hobby: 'radium'
}
```

## The following filter validates the first two documents:

```javascript
{
  or: [
    {
      equals: {
        city: 'NYC'
      }
    },
    {
      equals: {
        city: 'London'
      }
    }
  ]
}
```
