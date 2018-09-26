---
layout: full.html.hbs
algolia: true
title: in
---

# in

{{{since "1.0.0"}}}

Like [equals]({{ site_base_path }}kuzzle-dsl/terms/equals), but accepts an array of possible scalar values to be tested.

## Syntax

`in: { <field name>: <array of values> }`

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
