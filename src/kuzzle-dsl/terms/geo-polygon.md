---
layout: full.html
algolia: true
title: geoPolygon
---

# geoPolygon

Filter documents having their location field located inside a given polygon.

Unlike the GeoJSON representation, a polygon, here, must contain at least 3 geopoints.  
The last point do not have to be the same as the first one, but the points must be sorted in the right order. The polygon is automatically closed.

For each polygon points, all the possible point notations are valid (see above).

### Example of a valid polygon representation:

```javascript
{
  points: [
    [0,0],
    {lon: 1, lat: 2},
    '2,1',
    's037ms06g'
  ]
}
```

![Illustration of geoPolygon]({{ site_base_path }}assets/images/geolocation/geoPolygon.png)

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
geoPolygon: {
  location: {
    points: [
      { lat: 51.523029, lon: -0.160793 },
      { lat: 51.522842, lon: -0.145043 },
      { lat: 51.518303, lon: -0.146116 },
      { lat: 51.516487, lon: -0.162295 },
      { lat: 51.520226, lon: -0.158432 }
    ]
  }
}
```
