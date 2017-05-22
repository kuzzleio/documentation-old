---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: unsetJwtToken
---

# unsetJwtToken

```js
kuzzle.unsetJwtToken();
```

```java
kuzzle.unsetJwtToken();
```

```php
<?php
use \Kuzzle\Kuzzle;

$kuzzle = new Kuzzle('localhost');

$kuzzle->unsetJwtToken();
```

Unsets the internal JSON Web Token used for authentication, and stops all existing subscriptions

---

## Return value

Returns the `Kuzzle` object to allow chaining.
