---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: setAutoRefresh
---

# setAutoRefresh

```js
kuzzle.setAutoRefresh('myIndex', true);
```


```java
kuzzle.setAutoRefresh("myIndex", true);
```

```php
<?php
use \Kuzzle\Kuzzle;

$kuzzle = new Kuzzle('localhost');

$kuzzle->setAutoRefresh('myIndex', true);
```

The `autoRefresh` flag, when set to true, will make Kuzzle perform a
[`refresh`](https://www.elastic.co/guide/en/elasticsearch/guide/5.x/near-real-time.html#refresh-api) request
immediately after each write request, forcing the documents to be immediately visible to search.

Given an index, the `setAutoRefresh` function updates its `autoRefresh` status.

<aside class="left warning">
    <p>
        A refresh operation comes with some performance costs.
    </p>
    <p>
        While forcing the autoRefresh can be convenient on a development or test environmnent, it is advised to avoid
        using it on production or at least to carefully monitor its implications before using it.
    </p>
</aside>

---

## setAutoRefresh([index], autoRefresh, [options], [callback])

| Argument | Type | Description
|----------|------|-------------
| `index` | string | _Optional_ The index to set the `autoRefresh` for. If not set, defaults to [kuzzle.defaultIndex]({{ site_base_path }}sdk-reference/kuzzle/#properties).
| `autoRefresh` | boolean | The value to set for the `autoRefresh` setting.
| `options` | JSON object | Optional parameters
| `callback` | function | _Optional_ Callback handling the response

---

## Options

| Option | Type | Description | Default
|--------|------|-------------|---------
| `queuable` | boolean | Makr this request as (non)queuable | `true`

---

## Return value

Returns the `Kuzzle` object to allow chaining.

---

## Callback response

The response is a boolean reflecting the new `autoRefresh` status.
