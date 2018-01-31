---
layout: full.html
algolia: true
title: geoPolygon
---

# geoPolygon

{{{since '1.0.0'}}}

Filter documents containing a geographical point, confined within a polygon that has an arbitrary number of sides:

![Illustration of geoPolygon]({{ site_base_path }}assets/images/geolocation/geoPolygon.png)

A `geoPolygon` filter is described using a `points` array, containing an arbitrary number of [geopoints]({{ site_base_path }}kuzzle-dsl/essential/geopoints/) (at least 3).  
Koncorde automatically closes geopolygons.

Different geopoint formats can be used to describe different corners of a polygon.

The `points` object must be stored in an attribute named after the geographical point to test in future documents.


## Example

Given the following documents:

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
  location: {record
    lat: 51.519291,
    lon: -0.149817
  }
}
```

The following filter will match the second document only:

```javascript
{
  geoPolygon: {
    location: {
      points: [
        { lat: 51.523029, lon: -0.160793 },
        [51.522842, -0.145043],
        '51.518303, -0.146116',
        { latLon: {lat: 51.516487, lon: -0.162295 }},
        'gcpvh6uxh60x1'
      ]
    }
  }
}
```
