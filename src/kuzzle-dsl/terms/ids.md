---
layout: full.html
algolia: true
title: ids
---

# ids

{{{since "1.0.0"}}}

This filter returns documents that have an ID that matches the input list.

## Example

Given the following documents:

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

The following filter validates first document:

```javascript
{
  ids: {
    values: ['a']
  }
}
```
