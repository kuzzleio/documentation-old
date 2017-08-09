---
layout: full.html
words: 109
algolia: true
title: request
description: list of global events emitted on requests execution 
order: 200
---

# request

Global events triggered on requests execution.

| Event | Type | Description | Payload |
|-------|------|-------------|---------|
|`request:onAuthorized` | Pipe | Triggered when a request passed authorization checks and is ready to be processed. Triggered before any `<controller>:before<Action>` event | Type: Request |
|`request:onError` | Pipe | Triggered when a request execution fails. Triggered after any `<controller>:after<Action>` event | Type: Request |
|`request:onSuccess` | Pipe | Triggered when a request execution succeeds. Triggered after any `<controller>:after<Action>` event | Type: Request |
|`request:onUnauthorized` | Pipe | Triggered when a request failed authorization checks and is about to be rejected with a `401` error code. | Type: Request |
