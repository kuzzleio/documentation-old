---
layout: side-code.html.hbs
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: MemoryStorage
description: Memory cache storage methods
show-subheader: true
subheader-title: Constructor
---

# Constructor

```js
/*
 Constructor is not exposed in the JS/Node SDK. You may get the instantiated
 MemoryStorage object by calling Kuzzle.memoryStorage
 */
var memoryStorage = kuzzle.memoryStorage;
```

```java
// using the static instance
MemoryStorage memoryStorage = kuzzle.memoryStorage;

// or instantiating a new MemoryStorage object
MemoryStorage memoryStorage = new MemoryStorage(kuzzle);
```

```php
<?php

use \Kuzzle\Kuzzle;
use \Kuzzle\MemoryStorage;

$kuzzle = new Kuzzle('localhost');

// using the static instance
$memoryStorage = $kuzzle->memoryStorage();

// or instantiating a new MemoryStorage object
$memoryStorage = new MemoryStorage($kuzzle);
```

Kuzzle's memory storage is a data store separate from the database layer.
It uses Redis internally, and most of its underlying functions are exposed by Kuzzle.

---

## MemoryStorage(Kuzzle)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `Kuzzle` | object | An instantiated [Kuzzle]({{ site_base_path }}sdk-reference/kuzzle) SDK object |
