---
layout: full.html.hbs
algolia: true
title: geoDistanceRange
---

# geoDistanceRange

{{{since "1.0.0"}}}

Filter documents containing a geographical point, whose position is within a distance range from a given point of origin:

![Illustration of geoDistanceRange]({{ site_base_path }}assets/images/geolocation/geoDistanceRange.png)

A `geoDistanceRange` filter contains the following properties:

* a [geopoint]({{ site_base_path }}kuzzle-dsl/essential/geopoints/) defining the center point of the distance range. This geopoint attribute must be named after the geographical point to test in future documents
* a `from` attribute, describing the minimum distance from the center point, using a [geodistance format]({{ site_base_path }}kuzzle-dsl/essential/geodistances/)
* a `to` attribute, describing the maximum distance from the center point, using a [geodistance format]({{ site_base_path }}kuzzle-dsl/essential/geodistances/)

## Syntax

```
geoDistanceRange: {
  <geopoint field name>: {
    <geopoint description>
  },
  from: <geodistance>,
  to: <geodistance>
}
```

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
  location: {
    lat: 51.519291,
    lon: -0.149817
  }
}
```

The following filter will match the second document only:

```javascript
{
  geoDistanceRange: {
    location: [51.5029017, -0.1606903],
    from: '1km',
    to: '10 kilometers'
  }
}
```
