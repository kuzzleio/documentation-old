---
layout: full.html.hbs
algolia: true
title: exists
---

# exists

{{{since "1.0.0"}}}

Test for the existence of a key in an object, or of a scalar in an array.  

## Syntax

Since Koncorde 1.2, the `exists` syntax is as follows:

`exists: 'nested.field.path'`
(see [nested field syntax]({{ site_base_path }}kuzzle-dsl/essential/nested))

`exists: 'nested.array[value]'`
(see [array value syntax]({{ site_base_path }}kuzzle-dsl/essential/arrayvalues))

The following syntax is deprecated since Koncorde 1.2, and supported for backward compatibility only:

`exists: { field: 'nested.field.path' }`

## Example

Given the following documents:

```javascript
{
  firstName: 'Grace',
  lastName: 'Hopper',
  city: 'NYC',
  hobby: ['compiler', 'COBOL'],
  alive: false
},
{
  firstName: 'Ada',
  lastName: 'Lovelace',
  city: 'London',
  hobby: ['programming', 'algorithm']
}
```

The following filter validates the first document:

```javascript
{
  exists: 'alive'
}
```

And this filter validates the second document:

```javascript
{
  exists: 'hobby["algorithm"]'
}
```
