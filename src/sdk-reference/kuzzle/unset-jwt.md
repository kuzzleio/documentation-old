---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: unsetJwt
---

# unsetJwt

```js
kuzzle.unsetJwt();
```

```java
kuzzle.unsetJwt();
```

```php
<?php
use \Kuzzle\Kuzzle;

$kuzzle = new Kuzzle('localhost');

$kuzzle->unsetJwt();
```

Unsets the internal JSON Web Token used for authentication, and stops all existing subscriptions

---

## Return value

Returns the `Kuzzle` object to allow chaining.
