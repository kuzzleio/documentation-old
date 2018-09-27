---
layout: full.html.hbs
algolia: true
title: range
---

# range

{{{since "1.0.0"}}}

Filters documents with number attributes within a provided interval.

A range can be defined with at least one of the following arguments:

* `gte`: Greater-than or equal to `<number>`
* `gt`: Greater-than `<number>`
* `lte`: Less-than or equal to
* `lt`: Less-than

Ranges can be either bounded or half-bounded.

## Syntax 

```
range: {
  <field to be tested>: {
    [gte]: <number>,
    [gt]: <number>,
    [lte]: <number>,
    [lt]: <number>
  }
}
```

## Example

Given the following documents:

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

The following filter validates the last two documents:

```javascript
{
  range: {
    age: {
      lt: 85
    }
  }
}
```
