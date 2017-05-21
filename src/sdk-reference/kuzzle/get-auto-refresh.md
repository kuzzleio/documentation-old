---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: getAutoRefresh
---

# getAutoRefresh

```js
// Using callbacks (node.js or browser)
kuzzle.getAutoRefresh('myIndex', function (err, autoRefresh) {
  console.log(autoRefresh);     // true|false
});

// Using promises (node.js)
kuzzle
  .getAutoRefreshPromise('myIndex')
  .then(autoRefresh => {
    console.log(autoRefresh);   // true|false
  });
```

```java
kuzzle.getAutoRefresh("myIndex", new ResponseListener<Boolean>() {
  @Override
  public void onSuccess(Boolean autoRefresh) {
    // autoRefresh var contains the autoRefresh status of myIndex.
  }

  @Override
  public void onError(JSONObject error) {
    // Handle error
  }
}
```

```php
<?php
use \Kuzzle\Kuzzle;

$kuzzle = new Kuzzle('localhost');
$result = $kuzzle->getAutoRefresh('myIndex');

// $result = true | false
```

The `autoRefresh` flag, when set to true, will make Kuzzle perform a
[`refresh`](https://www.elastic.co/guide/en/elasticsearch/guide/5.x/near-real-time.html#refresh-api) request
immediately after each write request, forcing the documents to be immediately visible to search.

The `getAutoRefresh` function returns the current `autoRefresh` status for the given index.

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

#### getAutoRefresh([index], [options], callback)

| Arguments | Type | Description
|-----------|------|------------
| `index` | string | Optional index to query. If no set, defaults to [Kuzzle.defaultIndex]({{ site_base_path }}sdk-reference/kuzzle/#properties)
| `options` | JSON object | Optional parameters
| `callback`| function | Callback handling the response

---

## Options

| Option | Type | Description | Default
|--------|------|-------------|---------
| `queuable` | boolean | Mark this request as (not) queuable | `true`

---

## Callback response

The response is a boolean reflecting the index `autoRefresh`status.
