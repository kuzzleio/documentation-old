---
layout: full.html.hbs
algolia: true
title: missing
---

# missing

{{{since "1.0.0"}}}

A filter matching documents either with a missing field in an object, or with a missing value in an array.

A `missing` filter used to match arrays without a specific value will also match if:

* the tested array property is entirely missing from the provided document
* the tested property in the provided document is not an array

## Syntax

Since Koncorde 1.2, the `missing` syntax is as follows:

`missing: 'nested.field.path'`
(see [nested field syntax]({{ site_base_path }}kuzzle-dsl/essential/nested))

`missing: 'nested.array[value]'`
(see [array value syntax]({{ site_base_path }}kuzzle-dsl/essential/arrayvalues)

The following syntax is deprecated since Koncorde 1.2, and supported for backward compatibility only:

`missing: { field: 'nested.field.path' }`

## Example

Given the following documents:

```javascript
{
  firstName: 'Grace',
  lastName: 'Hopper',
  city: 'NYC',
  hobbies: ['compiler', 'COBOL'],
  alive: false
},
{
  firstName: 'Ada',
  lastName: 'Lovelace',
  city: 'London',
  hobbies: ['algorithm', 'programming'],
}
```

The following filter validates the second document:

```javascript
{
  missing: 'alive'
}
```

And this filter validates the first document: 

```javascript
{
  missing: 'hobbies["algorithm"]'
}
```
