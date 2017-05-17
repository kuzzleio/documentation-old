---
layout: full.html
algolia: true
title: Sending volatile data
description: broadcast extra volatile data to subscribers
order: 400
show-subheader: true
subheader-title: Introduction
---

# Sending volatile data

In every request you send to Kuzzle, you can include a `volatile` object.
This object content will be ignored by Kuzzle,
but it will also be forwarded back in `responses` and in `notifications` (see below).

You can also include volatile information to a subscription request.
These volatile information will be forwarded to other subscribers at the moment of the subscription,
and when you leave the room. Please note that when leaving the room,
the forwarded volatile data are those provided in the **subscription** request.
