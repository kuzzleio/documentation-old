---
layout: full.html
algolia: true
title: KuzzleEventEmitter
description: Abstract Event Emitter class
---

# Kuzzle Event Emitter

The `KuzzleEventEmitter` abstract class is used by the [Kuzzle]({{ site_base_path }}sdk-reference/kuzzle/) SDK and [Room]({{ site_base_path }}sdk-reference/room/) instances to emit and listen to events (see [Event Handling]({{ site_base_path }}sdk-reference/essentials/events/) section).

These objects expose a `on()` method that allows one or more callbacks to be attached to named events emitted by the object.

In javascript, `KuzzleEventEmitter` inherits from NodeJS's [EventEmitter](https://nodejs.org/api/events.html) prototype.
In other languages, a subset of these methods is implemented.
