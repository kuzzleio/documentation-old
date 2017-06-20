---
layout: full.html
algolia: true
title: Plugins features
description: understand Kuzzle plugins mechanisms
order: 200
show-subheader: true
subheader-title: Introduction
---


# Plugins Features


Depending on the properties it exposes, a plugin can extend of one or several of the following features of Kuzzle:

* Core
  - Listening asynchronously to events (on the same thread or a separate one),
  - Listening synchronously to events (and intercept the Request life-cycle),
  - Adding a controller route,
  - Adding a new authentication strategy.
* Proxy
  - Adding a new communication protocol.
