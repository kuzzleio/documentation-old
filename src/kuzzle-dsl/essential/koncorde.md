---
layout: full.html
algolia: true
title: Koncorde
description: Real-time percolation engine
order: 0
---

# Koncorde

The DSL described in this documentation is interpreted by [Koncorde](https://www.npmjs.com/package/koncorde), Kuzzle's real-time percolation engine.

A data percolation engine has the following properties:

* an arbitrary number of filters can be indexed
* whenever data is submitted to the engine, it returns the indexed filters matching it
* data is never stored in the engine

In other words, a percolation engine is the reverse of a search engine, where data is indexed and filters are used to retrieve data matching them.

