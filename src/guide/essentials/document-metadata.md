---
layout: full.html
algolia: true
title: Document metadata
order: 450
---

# Document metadata

Whenever a document gets created, updated or deleted, Kuzzle adds metadata to it, providing information about its life-cycle.

---

## Overview

Added metadata can be viewed in document's `_meta` property:

```json
{
  "_index": "myindex",
  "_type": "mycollection",
  "_id": "AVkDLAdCsT6qHI7MxLz4",
  "_score": 0.25811607,
  "_source": {
    "message": "Hey! Ho!"
  },
  "_meta": {
    "author": "<kuid>",
    "createdAt": 1481816934209,
    "updatedAt": null,
    "updater": null,
    "active": true,
    "deletedAt": null
  }
}
```

* `author`: The author [unique identifier]({{ site_base_path }}guide/kuzzle-depth/authentication/#the-kuzzle-user-identifier-kuid)
* `createdAt`: Timestamp of the document creation (create or replace), in Epoch-milliseconds format
* `updatedAt`: Timestamp of the last document update in Epoch-milliseconds format, or `null` if no update has been made
* `updater`: The updater [unique identifier]({{ site_base_path }}guide/kuzzle-depth/authentication/#the-kuzzle-user-identifier-kuid), or `null` if no update has been made
* `active`: `true` until the document has been put in the trashcan
* `deletedAt`: deletion timestamp, `null` until put in the trashcan

---

## Search queries

Metadata can be queried like any other document properties:

```json
{
  "query": {
      "range": {
          "_meta.createdAt": {
            "lte": 1481816930000
          }
      }
    }
}
```

---

## Documents deletion

When a document gets deleted, Kuzzle first isolates it from other active documents, by putting in an area called the trashcan.

Documents in the trashcan cannot be accessed, searched or counted, unless the `includeTrash` flag is set when invoking the corresponding API routes.

---

## Garbage collection

On regular intervals, Kuzzle will permanently delete some documents in the trashcan, starting from documents having stayed the longest in that area.

The garbage collector follows the following rules:

* if Kuzzle is in [overloaded state]({{ site_base_path }}kuzzle-events/core/#core-overload) when garbage collection is about to start, or if Kuzzle enters that state during garbage collection, then it will be delayed and wait until Kuzzle is no longer overloaded
* Its behavior is configured using the `services.garbageCollector` property in Kuzzle's [configuration file]({{ site_base_path }}guide/essentials/configuration/), namely how often it passes and how many documents are deleted per data collection
* When Kuzzle is started, it will wait the configured delay before running the garbage collector for the first time
