---
layout: full.html
algolia: true
title: geoDistanceRange
---

# geoDistanceRange

Filter documents having their location field within a distance range from a given point of origin.

![Illustration of geoDistanceRange]({{ site_base_path }}assets/images/geolocation/geoDistanceRange.png)

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
geoDistanceRange: {
  location: {
    lat: 51.5029017,
    lon: -0.1606903
  },
  from: '1km',
  to: '10km'
}
```
