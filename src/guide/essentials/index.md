---
layout: full.html
algolia: true
title: Essentials
description: learn mechanisms of kuzzle
order: 100
show-subheader: true
subheader-title: Introduction
---

# Introduction

## Persistent data

Kuzzle relies on [Elasticsearch](https://www.elastic.co/) to store and fetch persistent data.
You can perform a variety of CRUD and fine-grained search operations on persistent data.
Please refer to the [dedicated section]({{ site_base_path }}guide/essentials/persisted) for more details.

## Real-time notifications

Kuzzle enables you to set up subscriptions to sets of data, in order to be notified in real-time about whatever happens to them.
You can create a subscription by selecting a set of data. Selections (also called **filters**) are expressed in a
Domain-specific Language (DSL) that we tailored for this purpose.
Please refer to the [dedicated section]({{ site_base_path }}guide/essentials/real-time) for more details.

## SDK

Kuzzle ships with a set of open-source [SDK]({{ site_base_path }}sdk-reference) for a variety of languages:

- [Javascript](https://github.com/kuzzleio/sdk-javascript) (NodeJS & Browsers)
- [Android](https://github.com/kuzzleio/sdk-android)
- [PHP](https://github.com/kuzzleio/sdk-php)
- C (planned)

## Supported protocols

Kuzzle supports a variety of communication protocols.  
For the time being, Kuzzle supports the following protocols:

- HTTP
- Websocket
- Socket.io
- MQTT (via plugin)

You can directly interact with Kuzzle using the [Kuzzle API reference]({{ site_base_path }}api-documentation).

## Authentication

Kuzzle supports a variety of authentication strategies via [PassportJS](http://passportjs.org/). Local and OAuth-based authentication is natively supported, but you can also add your own custom strategy.

Please refer to the [dedicated section]({{ site_base_path }}guide/essentials/security) for more details.

## Plugins

Kuzzle is extensible in many ways. Plugins enable you to

* trigger actions on data-related events,
* intercept the data flow at any point of its lifecycle,
* add custom methods to the public API,
* add new communication protocols,
* add new authentication strategies.

Please refer to the [dedicated section]({{ site_base_path }}guide/essentials/plugins) for more details.
