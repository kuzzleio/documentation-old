---
layout: full.html
algolia: true
title: bool
---

# bool

A filter matching documents matching boolean combinations of other queries.

This operand accepts the following attributes:

* `must` all listed conditions must be `true`
* `must_not` all listed conditions must be `false`
* `should` one of the listed condition must be `true`
* `should_not` one of the listed condition must be `false`

Each one of these attributes are an array of filter objects.

## Given the following documents:

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

## The following filter validates the second document:

```javascript
{
  bool: {
    must : [
      {
        in : {
          firstName : ['Grace', 'Ada']
        }
      },
      {
        range: {
          age: {
            gte: 36,
            lt: 85
          }
        }
      }
    ],
    'must_not' : [
      {
        equals: {
          city: 'NYC'
        }
      }
    ],
    should : [
      {
        equals : {
          hobby : 'computer'
        }
      },
      {
        exists : {
          field : 'lastName'
        }
      }
    ]
  }
}
```
