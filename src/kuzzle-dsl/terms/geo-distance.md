---
layout: full.html.handlebars
algolia: true
title: geoDistance
---

# geoDistance

{{{since "1.0.0"}}}

Filter documents containing a geographical point, whose position is within a distance radius centered around a provided point of origin:

![Illustration of geoDistance]({{ site_base_path }}assets/images/geolocation/geoDistance.png)

A `geoDistance` filter contains the following properties:

* a [geopoint]({{ site_base_path }}kuzzle-dsl/essential/geopoints/) defining the point of origin. This geopoint attribute must be named after the geographical point to test in future documents
* a `distance` parameter in [geodistance format]({{ site_base_path }}kuzzle-dsl/essential/geodistances/)


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
  geoDistance: {
    location: {
      lat: 51.5029017,
      lon: -0.1606903
    },
    distance: '10km'
  }
}
```
