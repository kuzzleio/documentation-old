# ~ index controller


## create

<section class="http"></section>

>**URL:** `http://kuzzle:7512/<index>/_create`
>**Method:** `POST`

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "index": "<index>",
  "controller": "index",
  "action": "create"
}
```

>Response

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "index": "<index>",
  "action": "create",
  "controller": "index",
  "requestId": "<unique request identifier>",
  "result": {
    "acknowledged": true
  }
}
```

When creating a document or a collection, Kuzzle will automatically create a data index if needed.
But in some cases, you may want to create an empty index directly, prior to storing any document in it.

Create an `index` in Kuzzle's persistent storage layer.


## delete

<section class="http"></section>

>**URL:** `http://kuzzle:7512/<index>`
>**Method:** `DELETE`

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "index": "<index>",
  "controller": "index",
  "action": "delete"
}
```

>Response

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "index": "<index>",
  "controller": "index",
  "action": "delete",
  "requestId": "<unique request identifier>",
  "result": {
    "acknowledged": true
  }
}
```

Deletes an entire `index` from Kuzzle's persistent storage layer.


## exists

<section class="http"></section>

>**URL:** `http://kuzzle:7512/<index>/_exists`
>**Method:** `GET`

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "index": "<index>",
  "controller": "index",
  "action": "exists"
}
```

>Response

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "index": "<index>",
  "controller": "index",
  "action": "exists",
  "requestId": "<unique request identifier>",
  "result": true
}
```

Checks if the given index exists in Kuzzle storage layer.


## getAutoRefresh

<section class="http"></section>

>**URL:** `http://kuzzle:7512/<index>/_autoRefresh`
>**Method:** `GET`

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "index": "<index>",
  "controller": "index",
  "action": "getAutoRefresh"
}
```

>Response

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "requestId": "<unique request identifier>",
  "index": "<index>",
  "controller": "index",
  "action": "getAutoRefresh",
  "result":  true|false             // The autoRefresh status for <index>
}
```

The `autoRefresh` flag, when set to true, will make Kuzzle perform a
[`refresh`](https://www.elastic.co/guide/en/elasticsearch/guide/5.x/near-real-time.html#refresh-api) request
immediately after each write request, forcing the documents to be immediately visible to search.

The `getAutoRefresh` actions returns the current `autoRefresh` status for the given index.

<aside class="left warning">
  <p>
    A refresh operation comes with some performance costs.
  </p>
  <p>
    While forcing the autoRefresh can be convenient on a development or test environmnent, it is advised to avoid
    using it on production or at least to carefully monitor its implications before using it.
  </p>
</aside>


## list

<section class="http"></section>

>**URL:** `http://kuzzle:7512/_list`
>**Method:** `GET`

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "index",
  "action": "list"
}
```

>Response

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "controller": "index",
  "action": "list",
  "requestId": "<unique request identifier>",
  "result": {
    "total": 13,
    "hits": [
      "index_1",
      "index_2",
      "index_...",
      "index_n"
    ]
  }
}
```

Returns the complete data indexes.


## mDelete

<section class="http"></section>

>**URL:** `http://kuzzle:7512/_mDelete`
>**Method:** `DELETE`
>**Body:**

<section class="http"></section>

```litcofee
indexes: [
  "index1",
  "index2",
  ...
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "index",
  "action": "mDelete",
  "body": {
    "indexes": [
      "index1",
      "index2",
      ...
    }
  }
}
```

>Response

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "action": "mDelete",
  "controller": "index",
  "requestId": "<unique request identifier>",
  "result": {  // list of actual deleted indexes
    "deleted":[
      "index1",
      "index2"
    ]
  }
}
```

Deletes all `indexes` specified in the body, that current user is allowed to delete, from Kuzzle's persistent storage layer.

If no `indexes` is specified in the body, all the indexes that the current user is allowed to delete will be deleted.

That means: if Kuzzle contains indexes "index1", "index2" and "index3",
but current user is only allowed to delete "index1" and "index2", only both of them are deleted,
and "index3" is kept in the persistent storage layer.

The response contains the list of indexes that were actually deleted.


## refresh

<section class="http"></section>

>**URL:** `http://kuzzle:7512/<index>/_refresh`
>**Method:** `POST`

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "index": "<index>",
  "controller": "index",
  "action": "refresh"
}
```

>Response

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "index": "<index>",
  "controller": "index",
  "action": "refresh",
  "requestId": "<unique request identifier>",
  "result": {
    "_shards": {
        "failed": 0,
        "succressful": 5,
        "total": 10
    }
  }
}
```

When writing or deleting documents in Kuzzle's database layer, the update needs to be indexed before being reflected
in the search index.
By default, this operation can take up to 1 second.

Given an index, the `refresh` action forces a
[`refresh`](https://www.elastic.co/guide/en/elasticsearch/guide/5.x/near-real-time.html#refresh-api),
on it, making the documents visible to search immediately.

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


## refreshInternal

<section class="http"></section>

>**URL:** `http://kuzzle:7512/_refreshInternal`
>**Method:** `POST`

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "index",
  "action": "refreshInternal"
}
```

>Response

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
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


## setAutoRefresh

<section class="http"></section>

>**URL:** `http://kuzzle:7512/<index>/_autoRefresh`
>**Method:** `POST`

>Query

<section class="http"></section>

```litcoffee
{
  "autoRefresh": true|false
}
```

<section class="others"></section>

```litcoffee
{
  "index": "<index>",
  "controller": "index",
  "action": "setAutoRefresh",
  "body": {
    "autoRefresh": true|false
  }
}
```

>Response

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "index": "<index>",
  "controller": "index",
  "action": "setAutoRefresh",
  "requestId": "<unique request identifier>",
  "result": true|false                // The autoRefresh status set for the index
}
```

The `autoRefresh` flag, when set to true, will make Kuzzle perform a
[`refresh`](https://www.elastic.co/guide/en/elasticsearch/guide/5.x/near-real-time.html#refresh-api) request
immediately after each write request, forcing the documents to be immediately visible to search.

Given an index, the `setAutoRefresh` action updates its `autoRefresh` status.

<aside class="left warning">
  <p>
    A refresh operation comes with some performance costs.
  </p>
  <p>
    While forcing the autoRefresh can be convenient on a development or test environmnent, it is advised to avoid
    using it on production or at least to carefully monitor its implications before using it.
  </p>
</aside>
