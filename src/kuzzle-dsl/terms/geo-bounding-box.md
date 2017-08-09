---
layout: full.html
algolia: true
title: geoBoundingBox
---

# geoBoundingBox

Filter documents having their location field within a bounding box.

A bounding box is a 2D box that can be defined using:

1. 2 points coordinates tuples, defining the top left and bottom right corners of the box
2. 4 values defining the 4 box sides: ```top``` and ```bottom``` are latitudes, and ```left``` and ```right``` are longitudes

### All of these representations are defining the same bounding box:

```javascript
{
  top: -74.1,
  left: 40.73,
  bottom: -71.12,
  right: 40.01
}
```

```javascript
{
  topLeft: { lat: 40.73, lon: -74.1 },
  bottomRight: { lat: 40.01, lon: -71.12 }
}
```

```javascript
{
  top_left: { lat: 40.73, lon: -74.1 },
  bottom_right: { lat: 40.01, lon: -71.12 }
}
```

<aside class="note">
When cooddinates are in array format, the format is [lon, lat] to comply with <a href="http://geojson.org/">GeoJSON</a>
</aside>

```javascript
{
  topLeft: [ -74.1, 40.73 ],
  bottomRight: [ -71.12, 40.01 ]
}
```

```javascript
{
  top_left: [ -74.1, 40.73 ],
  bottom_right: [ -71.12, 40.01 ]
}
```

<aside class="note">
As a string, the coordinates format is "lat, lon"
</aside>

```javascript
{
  topLeft: "40.73, -74.1",
  bottomRight: "40.01, -71.12"
}
```

```javascript
{
  top_left: "40.73, -74.1",
  bottom_right: "40.01, -71.12"
}
```

### Here is the [geoHash](https://en.wikipedia.org/wiki/Geohash) representation

```javascript
{
  topLeft: "dr5r9ydj2",
  bottomRight: "drj7teegp"
}
```

```javascript
{
  top_left: "dr5r9ydj2",
  bottom_right: "drj7teegp"
}
```

![Illustration of geoBoundingBox]({{ site_base_path }}assets/images/geolocation/geoBoundingBox.png)

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
geoBoundingBox: {
  location: {
    top: -2.939744,
    left: 52.394484,
    bottom: 1.180129,
    right: 51.143628
  }
}
```
