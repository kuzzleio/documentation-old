---
layout: full.html
algolia: true
title: request
description: list of global events emitted on requests execution 
order: 200
---

# request

{{{since "1.0.0"}}}

Global events triggered on requests execution.

---

## `request:onAuthorized`

{{{since "1.0.0"}}}

**Event type:** Pipe

**Payload:** a [Request]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) object

Triggered whenever a request passed authorization checks and is ready to be processed.  
This event occurs before any `<controller>:before<Action>` event.

---

## `request:onError`

{{{since "1.0.0"}}}

**Event type:** Pipe

**Payload:** a [Request]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) object

Triggered whenever a request execution fails.  
This event occurs after any `<controller>:error<Action>` event.

---

## `request:onSuccess`

{{{since "1.0.0"}}}

**Event type:** Pipe

**Payload:** a [Request]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) object

Triggered whenever a request execution succeeds.  
This event occurs after any `<controller>:after<Action>` event.

---

## `request:onUnauthorized`

{{{since "1.0.0"}}}

**Event type:** Pipe

**Payload:** a [Request]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) object

Triggered whenever a request failed authorization checks, and is about to be rejected with a `401` error code.

---
