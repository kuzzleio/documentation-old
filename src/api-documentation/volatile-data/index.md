---
layout: full.html.handlebars
algolia: true
title: Sending Volatile Data
description: broadcast extra volatile data to subscribers
order: 400
show-subheader: true
subheader-title: Introduction
---

# Sending Volatile Data

In every request you send to Kuzzle, you can include a `volatile` object.
This content of this object will be ignored by Kuzzle, and will be passed back in the [response]({{ site_base_path }}api-documentation/kuzzle-response/) or [notification]({{ site_base_path }}api-documentation/notifications/).

You can also provide volatile information to a subscription request.
This volatile information will be forwarded to other subscribers when the subscription is created
and when you leave the room. Please note that when leaving the room,
the forwarded volatile data are provided to the **subscription** request.
