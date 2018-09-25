---
layout: full.html.hbs
algolia: true
title: equals
---

# equals

{{{since "1.0.0"}}}

Matches attributes using strict equality.  
The tested attribute must be a scalar (number, string or boolean), and of the same type than the provided filter value.

## Syntax

```
equals: {
  <field name>: <value>
}
```

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
}
```

The following filter validates the first document:

```javascript
{
  equals: {
    firstName: 'Grace'
  }
}
```
