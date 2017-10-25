---
layout: full.html
algolia: true
title: notify
description: real-time notifications events
order: 200
---

# notify

{{{since "1.0.0"}}}

These events are triggered by Kuzzle's real-time engine, every time [a notification]({{ site_base_path }}api-documentation/notifications/) is about to be sent to subscribing clients.

[Synchronously listening plugin]({{ site_base_path }}plugins-reference/plugins-features/adding-pipes/) may block some (or all) notifications by rejecting the provided promise.

---

### `notify:dispatch`

{{{since "1.0.0"}}}

**Event type:** Pipe

**Payload:** a [Notification]({{ site_base_path }}api-documentation/notifications/) object

Triggered whenever a notification is about to be sent. This notification can be about a document, a user or a server event.  
Use the `type` property to determine the notification type.

---

### `notify:document`

{{{since "1.0.0"}}}

**Event type:** Pipe

**Payload:** a [Notification]({{ site_base_path }}api-documentation/notifications/) object

A document notification is about to be sent.

---

### `notify:server`

{{{since "1.0.0"}}}

**Event type:** Pipe

**Payload:** a [Notification]({{ site_base_path }}api-documentation/notifications/) object

A server notification is about to be sent.

---

### `notify:user`

{{{since "1.0.0"}}}

**Event type:** Pipe

**Payload:** a [Notification]({{ site_base_path }}api-documentation/notifications/) object

A user notification is about to be sent.

---
