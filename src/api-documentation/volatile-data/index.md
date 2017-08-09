---
layout: full.html
words: 91
algolia: true
title: Sending volatile data
description: broadcast extra volatile data to subscribers
order: 400
show-subheader: true
subheader-title: Introduction
---

# Sending volatile data

In every request you send to Kuzzle, you can include a `volatile` object.
This object content will be ignored by Kuzzle, but it will also be forwarded back in [responses]({{ site_base_path }}api-documentation/kuzzle-response/) and in [notifications]({{ site_base_path }}api-documentation/notifications/).

You can also provide volatile information to a subscription request.
These volatile information will be forwarded to other subscribers at the moment of the subscription,
and when you leave the room. Please note that when leaving the room,
the forwarded volatile data are those provided to the **subscription** request.
