---
layout: full.html.handlebars
algolia: true
title: in
---

# in

{{{since "1.0.0"}}}

This filter can be used to match a field to one of many values.

## Example

Given the following documents:

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

The following filter validates the first two documents:

```javascript
{
  in: {
    firstName: ['Grace', 'Ada']
  }
}
```
