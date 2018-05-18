---
layout: full.html.handlebars
algolia: true
title: equals
---

# equals

{{{since "1.0.0"}}}

The `equals` filter matches documents or messages attributes using string equality.

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
