---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: refreshInternal
---

# refreshInternal



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/_refreshInternal`  
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
  "controller": "index",
  "action": "refreshInternal"
}
```

>**Response**

```javascript
{
  "status": 200,
  "error": null,
  "controller": "index",
  "action": "refreshInternal",
  "requestId": "<unique request identifier>",
  "result": {
    "acknowledged": true
  }
}
```

When writing or deleting security and internal documents (users, roles, profiles, configuration, etc.)
in Kuzzle's database layer, the update needs to be indexed before being reflected in the search index.
By default, this operation can take up to 1 second.

Given an index, the `refreshInternal` action forces a
[`refresh`](https://www.elastic.co/guide/en/elasticsearch/guide/5.x/near-real-time.html#refresh-api),
on the internal index, making the documents visible to search immediately.

<aside class="left warning">
  <p>
    A refresh operation comes with some performance costs.<br>
  </p>
  <p>
    From <a href="https://www.elastic.co/guide/en/elasticsearch/guide/5.x/near-real-time.html#refresh-api">
    Elasticsearch documentation</a>:
    <div class="quote">
      "While a refresh is much lighter than a commit, it still has a performance cost.
      A manual refresh can be useful when writing tests, but don’t do a manual refresh every time
      you index a document in production; it will hurt your performance. Instead, your application
      needs to be aware of the near real-time nature of Elasticsearch and make allowances for it."
    </div>
  </p>
</aside>
