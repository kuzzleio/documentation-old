---
layout: full.html
algolia: true
title: The Plugin Engine
description: the plugin engine
order: 100
show-subheader: true
subheader-title: Introduction
---


# The Plugin Engine

The plugin engine lets you extend Kuzzle's functionality by adding code modules that offer auxiliary features. These modules can:

- Listen asynchronously to events (on the same thread as the Kuzzle process or on a separate one)
- Listen synchronously to events (and intercept a request)
- Add a controller route
- Add a new authentication strategy