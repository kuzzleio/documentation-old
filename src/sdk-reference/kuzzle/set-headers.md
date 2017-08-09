---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: setHeaders
---

# setHeaders

```js
kuzzle.setHeaders({someContent: 'someValue'}, true);
```

```java
JSONObject headers = new JSONObject().put("someContent", "someValue");

kuzzle.setHeaders(headers, true);
```

```php
<?php
use \Kuzzle\Kuzzle;

$kuzzle = new Kuzzle('localhost');

$newHeaders = [
  'someContent' => 'someValue'
];

$kuzzle->setHeaders($newHeaders);
```

This is a helper function returning itself, allowing to easily chain calls.

---

## setHeaders(content, [replace])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``content`` | JSON Object | New content |
| ``replace`` | boolean | true: replace the current content with the provided data, false: merge it |

**Note:** by default, the ``replace`` argument is set to ``false``

---

## Return value

Returns the `Kuzzle` object to allow chaining.
