---
layout: category-childrens.html
words:  86
title: Kuzzle events
order: 700
description: Learn about Kuzzle Events
icon: fa-eye
---

# Kuzzle events

Welcome to the kuzzle events documentation!

Every time Kuzzle receives a request coming from a client, it routes it towards a Controller and an Action, which processes it and sends the result back to the client. Each step of this life-cycle triggers an event. Here are the different types of events that Plugins can listen to.

There are two kind of events, `pipes` and `hooks`. Report to the [Plugin Reference documentation]({{ site_base_path }}plugins-reference/plugins-features/adding-pipes/#) for more details on how to listen to them.
