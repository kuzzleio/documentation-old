---
layout: full.html
words: 165
algolia: true
title: notify
description: real-time notifications events
order: 200
---

# notify

These events are triggered by Kuzzle's real-time engine, every time [a notification]({{ site_base_path }}api-documentation/notifications/) is about to be sent to subscribing clients.

[Synchronously listening plugin]({{ site_base_path }}plugins-reference/plugins-features/adding-pipes/) may block some (or all) notifications by rejecting the provided promise.

| Event | Type | Description | Payload |
|-------|------|-------------|---------|
| `notify:dispatch` | Pipe | A [Notification]({{ site_base_path }}api-documentation/notifications/) is about to be sent. Can be a document, a user or a server notification. <br/>Use the `type` property to determine the notification type. | An object representing the notification to send |
| `notify:document` | Pipe | A [Document Notification]({{ site_base_path }}api-documentation/notifications/#document-notifications) is about to be sent | An object representing the notification to send  |
| `notify:server` | Pipe | A [Server Notification]({{ site_base_path }}api-documentation/notifications/#server-notifications) is about to be sent | An object representing the notification to send |
| `notify:user` | Pipe | A [User Notification]({{ site_base_path }}api-documentation/notifications/#subscription-notifications) is about to be sent | An object representing the notification to send |
