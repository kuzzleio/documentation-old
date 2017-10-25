---
layout: category-childrens.html
title: Events
order: 700
description: Learn about Kuzzle Events
icon: fa-eye
---

# Kuzzle events

Welcome to the kuzzle events documentation!

Every time Kuzzle receives a request coming from a client, it routes it towards a Controller and an Action, which processes it and sends the result back to the client. Each step of this life-cycle triggers an event. 

This section lists every events that can be triggered by Kuzzle.

There are two types of events:

* Hooks: when Kuzzle emits a hook event, it won't wait for listeners to process it, and any kind of response will be ignored. These events can [only be listened asynchronously]({{ site_base_path }}plugins-reference/plugins-features/adding-hooks/) by plugins
* Pipes: listeners on pipe events can either listen to them asynchronously (exactly as if it was a hook event), or make Kuzzle wait for listeners to respond, either to validate the process or to modify the provided data on-the-fly. More on this in [our plugins section]({{ site_base_path }}plugins-reference/plugins-features/adding-pipes/)
