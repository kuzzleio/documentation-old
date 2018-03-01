---
layout: category-childrens.html
title: Events
order: 700
description: Learn about Kuzzle Events
icon: fa-eye
---

# Kuzzle Events

Welcome to the Kuzzle Events documentation!

Every time Kuzzle receives a request coming from a client, it routes it to a Controller and an Action. The Action processes the request and sends the result back to the client. Each step of this life-cycle triggers an event. 

This section lists every event that can be triggered by Kuzzle.

There are two types of events:

* Hooks: when Kuzzle emits a hook event, it won't wait for listeners to return a result, and it will ignore any result received from the listeners. These events will only be executed [asynchronously]({{ site_base_path }}plugins-reference/plugins-features/adding-hooks/)
* Pipes: listeners on pipe events can either listen to them asynchronously (exactly as if it was a hook event), or make Kuzzle wait for listeners to return a result that might validate the process or modify the process data. Read more in [our plugins section]({{ site_base_path }}plugins-reference/plugins-features/adding-pipes/)
