---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: dump
---

# dump

{{{since "1.4.0"}}}


<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/admin/_dump`  
**Method:** `POST`
</p>
</blockquote>

<blockquote class="json">
<p>
**Query**
</p>
</blockquote>


```json
{
  "controller": "admin",
  "action": "dump"
}
```

>**Response**

```javascript
{
  "requestId": "d16d5e8c-464a-4589-938f-fd84f46080b9",
  "status": 200,
  "error": null,
  "controller": "admin",
  "action": "dump",
  "collection": null,
  "index": null,
  "volatile": null,
  "result": { "acknowledge": true }
}
```

Asynchronously create a snapshot of Kuzzle's state.  
Depending on the configuration of Kuzzle, it may include the following:

* a coredump of Kuzzle
* the current Kuzzle configuration
* server logs
* Node.js binary & properties
* a list of OS properties
* plugins configuration
* usage statistics of the dumped instance

(See [configuration]({{ site_base_path }}guide/essentials/configuration))

The generated directory can be used to feed a complete report to the support team.  
This report is the same as the one generated during a crash.  

#### Cluster Mode

In a Cluster environment, the dump action will be propagated across all nodes.
