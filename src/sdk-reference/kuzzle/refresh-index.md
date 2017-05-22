---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: refreshIndex
---

# refreshIndex

```js
kuzzle.refreshIndex('myIndex');
```

```java
kuzzle.refreshIndex("myIndex");
```

```php
<?php
use \Kuzzle\Kuzzle;

$kuzzle = new Kuzzle('localhost');

try {
  $kuzzle->refreshIndex('myIndex');
}
catch (ErrorException $e) {

}
```

When writing or deleting documents in Kuzzle's database layer, the update needs to be indexed before being reflected
in the search index.  
By default, this operation can take up to 1 second.

Given an index, the `refresh` action forces a [`refresh`](https://www.elastic.co/guide/en/elasticsearch/guide/5.x/near-real-time.html#refresh-api),
 on it, making the documents visible to search immediately.

<aside class="left warning">
    A refresh operation comes with some performance costs.<br>
    <br>
    From <a href="https://www.elastic.co/guide/en/elasticsearch/guide/5.x/near-real-time.html#refresh-api">elasticsearch documentation</a>:
    <div class="quote">
    "While a refresh is much lighter than a commit, it still has a performance cost. A manual refresh can be useful when writing tests, but don’t do a manual refresh every time you index a document in production; it will hurt your performance. Instead, your application needs to be aware of the near real-time nature of Elasticsearch and make allowances for it."
    </div>
</aside>

---

## refreshIndex([index], [options], [callback])

| Argument | Type | Description
|----------|------|-------------
| `index` | string | _Optional_. The index to refresh. If not set, defaults to [kuzzle.defaultIndex]({{ site_base_path }}sdk-reference/kuzzle/#properties).
| `options` | JSON object | Optional parameters
| `callback` | function | _Optional_. Callback handling the response.

---

## Options

| Option | Type | Description | Default
|--------|------|-------------|---------
| `queuable` | boolean | Mark this request as (not)queuable | `true`

---

## Return value

Returns the `Kuzzle` object to allow chaining.

---

## Callback response

The response is a JSON structure matching the response from Elasticsearch.
