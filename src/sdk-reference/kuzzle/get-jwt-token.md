---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: getJwtToken
---

# getJwtToken

```js
var jwtToken = kuzzle.getJwtToken();
```

```java
String jwtToken = kuzzle.getJwtToken();
```

```php
<?php
use \Kuzzle\Kuzzle;

$kuzzle = new Kuzzle('localhost');
// ...
$token = $kuzzle->getJwtToken();
```

Get internal jwtToken used to request kuzzle.

---

## Return value

Returns the stored JWT as a string value.
