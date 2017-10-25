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

### `http:options`

**Event type:** Pipe

**Payload:** a [Request]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) object

Triggered whenever a request has been submitted through HTTP OPTIONS methods.

---
