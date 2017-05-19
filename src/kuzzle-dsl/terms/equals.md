---
layout: full.html
algolia: true
title: equals
---

# equals

The `equals` filter matches documents or messages attributes using string equality.

## Given the following documents:

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

## The following filter validates the first document:

```javascript
equals: {
  firstName: 'Grace'
}
```
