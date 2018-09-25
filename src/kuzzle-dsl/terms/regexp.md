---
layout: full.html.hbs
algolia: true
title: regexp
---

# regexp

{{{since "1.0.0"}}}
The `regexp` filter matches attributes using [PCREs](https://en.wikipedia.org/wiki/Perl_Compatible_Regular_Expressions).

## Syntax

A `regexp` filter has the following structure, splitting the usual `/pattern/flags` into two parts:

```javascript
regexp: {
  <field name>: {
    value: '<search pattern>',
    flags: '<modifier flags>'
  }
}
```

If you don't need any modifier flag, then you may also use the following simplified form:

```javascript
  regexp: {
    <field name>: '<search pattern>'
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
  regexp: {
    firstName: {
      value: '^g\w+',
      flags: 'i'
    }
  }
}
```
