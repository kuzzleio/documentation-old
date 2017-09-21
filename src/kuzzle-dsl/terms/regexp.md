---
layout: full.html
algolia: true
title: regexp
---

# regexp

{{{since "1.0.0"}}}

The `regexp` filter matches documents or messages attributes using perl-compatible regular expressions ([PCRE](https://en.wikipedia.org/wiki/Perl_Compatible_Regular_Expressions)).  
You can test only 1 attribute per `regexp` filter.

A `regexp` filter has the following structure, splitting the usual `/pattern/flags` into two parts:

```javascript
{
  regexp: {
    attributeToTest: {
      value: 'search pattern',
      flags: 'modifier flags'
    }
  }
}
```

Or, if you don't wish to add any modifier flags:

```javascript
{
  regexp: {
    attributeToTest: 'search pattern'
  }
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
