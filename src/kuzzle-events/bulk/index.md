---
layout: full.html
algolia: true
title: bulk
description: list of events emitted by the bulk controller
order: 200
---

# bulk

{{{since "1.0.0"}}}

Events triggered when a request is treated in the [`bulk` controller]({{ site_base_path }}api-documentation/controller-bulk)

---

### `bulk:afterImport`

{{{since "1.0.0"}}}

**Event type:** Pipe

**Payload:** a [Request]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) object

Triggered after a successful execution of a [bulk import]({{ site_base_path }}api-documentation/controller-bulk/import/) request.

---

### `bulk:beforeImport`

{{{since "1.0.0"}}}

**Event type:** Pipe

**Payload:** a [Request]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) object

Triggered before a [bulk import]({{ site_base_path }}api-documentation/controller-bulk/import/) request is executed.

---

### `bulk:errorImport`

{{{since "1.0.0"}}}

**Event type:** Pipe

**Payload:** a [Request]({{ site_base_path }}plugins-reference/plugins-context/constructors/#request) object

Triggered after an execution of a [bulk import]({{ site_base_path }}api-documentation/controller-bulk/import/) request failed.

---
