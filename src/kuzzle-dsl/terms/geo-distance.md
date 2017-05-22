---
layout: full.html
algolia: true
title: geoDistance
---

# geoDistance

Filter documents having their location field within a distance radius of a provided point of origin.

By default, when it is not specified, the distance unit is expressed in meters.  
Note that distance values are strings (including `from` and `to` attributes for `geoDistanceRange`)

### All formats supported by the [node-units](https://github.com/brettlangdon/node-units) library can be used:

Units   | Notations
--------|----------
meters  | meter, m
feet    | feet, ft
inches  | inch, in
yards   | yard, yd
miles   | mile, mi

### All these notations are equivalent:

```
1000
1000 m
1km
3280.839895013123 ft
3280.839895013123FT
39370.078740157485 inches
39370.078740157485 inch
39370.078740157485 in
1 093,6132983377079 yd
0.6213727366498067 miles
```

![Illustration of geoDistance]({{ site_base_path }}assets/images/geolocation/geoDistance.png)

## Given the following documents:

```javascript
{
  firstName: 'Grace',
  lastName: 'Hopper',
  location: {
    lat: 32.692742,
    lon: -97.114127
  }
},
{
  firstName: 'Ada',
  lastName: 'Lovelace',
  location: {
    lat: 51.519291,
    lon: -0.149817
  }
}
```

## The following filter will match the second document only:

```javascript
geoDistance: {
  location: {
    lat: 51.5029017,
    lon: -0.1606903
  },
  distance: '10km'
}
```
