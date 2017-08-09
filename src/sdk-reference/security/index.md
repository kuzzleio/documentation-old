---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: Security
description: Rights administration methods
show-subheader: true
subheader-title: Constructor
---

# Constructor

```js
/*
 Constructor is not exposed in the JS/Node SDK. You may get the instantiated
 Security object by calling Kuzzle.security
 */
var kuzzleSecurity = kuzzle.security;
```

```java
// using the static instance
Security security = kuzzle.security;

// or instantiating a new Security object
Security security = new Security(kuzzle);
```

```php
<?php

use \Kuzzle\Kuzzle;
use \Kuzzle\Security\Security;

$kuzzle = new Kuzzle('localhost');

// using the static instance
$security = $kuzzle->security();

// or instantiating a new Security object
$security = new Security($kuzzle);
```

The Security component lets you handle users permissions in Kuzzle.

Please refer to our [Kuzzle permissions guide]({{ site_base_path }}guide/essentials/security/#permissions) for more information.

---

## Security(Kuzzle)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `Kuzzle` | object | An instantiated [Kuzzle]({{ site_base_path }}sdk-reference/kuzzle) object |
