---
layout: full.html.hbs
algolia: true
title: geoBoundingBox
---

# geoBoundingBox

{{{since "1.0.0"}}}

Filter documents containing a geographical point confined within a bounding box:

![Illustration of geoBoundingBox]({{ site_base_path }}assets/images/geolocation/geoBoundingBox.png)

A bounding box is a 2D box that can be defined using either of the following formats:

* 2 [geopoints]({{ site_base_path }}kuzzle-dsl/essential/geopoints/), defining the top left (`topLeft` or `top_left`) and bottom right (`bottomRight` or `bottom_right`) corners of the box
* 4 distinct values defining the 4 box corners: `top` and `bottom` are latitudes, `left` and `right` are longitudes

The bounding box description must be stored in an attribute, named after the geographical point to be tested in future documents.

## Syntax

```
geoBoundingBox: { 
  <geopoint field name>: {
    <bounding box description>
  } 
}
```

## Bounding box description

All syntaxes below are accepted, as they describe the same bounding box, with the following properties:

* top-left corner of latitude `43.5810609` and longitude `3.8433703`
* bottom-right corner of latitude `43.6331979` and longitude `3.9282093`


```javascript
{
  point: {
    top: 43.5810609,
    left: 3.8433703,
    bottom: 43.6331979,
    right: 3.9282093
  }
}
```

```javascript
{
  point: {
    topLeft: { lat: 43.5810609, lon: 3.8433703 },
    bottomRight: { lat: 43.6331979, lon: 3.9282093 }
  }
}
```

```javascript
{
  point: {
    top_left: "43.5810609, 3.8433703",
    bottom_right: "43.6331979, 3.9282093"
  }
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
  geoBoundingBox: {
    location: {
      top: -2.939744,
      left: 52.394484,
      bottom: 1.180129,
      right: 51.143628
    }
  }
}
```
