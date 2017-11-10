---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: getJwt
---

# getJwt

```js
var jwt = kuzzle.getJwt();
```

```java
String jwt = kuzzle.getJwt();
```

```php
<?php
use \Kuzzle\Kuzzle;

$kuzzle = new Kuzzle('localhost');
// ...
$token = $kuzzle->getJwt();
```

Get internal Json Web Token used to request kuzzle.

---

## Return value

Returns the stored JWT as a string value.
