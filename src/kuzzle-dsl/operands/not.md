---
layout: full.html
algolia: true
title: not
---

# not

{{{since "1.0.0"}}}

The `not` filter omits the filter match.

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
}
```

## The following filter validates the first document:

```javascript
{
  not: {
    equals: {
      city: 'London'
    }
  }
}
```
