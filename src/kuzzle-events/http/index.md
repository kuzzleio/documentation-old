---
layout: full.html
algolia: true
title: http
description: list of events emitted by the http router
order: 200
---

# http

{{{since "1.0.0"}}}

Events triggered on HTTP communications.

---

### `http:get`

**Event type:** Pipe

**Payload:** a [Request]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) object

Triggered whenever a request has been submitted through HTTP GET methods.

---

### `http:post`

**Event type:** Pipe

**Payload:** a [Request]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) object

Triggered whenever a request has been submitted through HTTP POST methods.

---

### `http:put`

**Event type:** Pipe

**Payload:** a [Request]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) object

Triggered whenever a request has been submitted through HTTP PUT methods.

---

### `http:patch`

**Event type:** Pipe

**Payload:** a [Request]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) object

Triggered whenever a request has been submitted through HTTP PATCH methods.

---

### `http:delete`

**Event type:** Pipe

**Payload:** a [Request]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) object

Triggered whenever a request has been submitted through HTTP DELETE methods.

---

### `http:head`

**Event type:** Pipe

**Payload:** a [Request]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) object

Triggered whenever a request has been submitted through HTTP HEAD methods.

---

### `http:options`

**Event type:** Pipe

**Payload:** a [Request]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) object

Triggered whenever a request has been submitted through HTTP OPTIONS methods.

---
