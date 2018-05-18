---
layout: side-code.html.hbs
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: setDefaultIndex
---

# setDefaultIndex

```js
kuzzle.setDefaultIndex('index');
```

```php
<?php
use \Kuzzle\Kuzzle;

$kuzzle = new Kuzzle('localhost');

$kuzzle->setDefaultIndex('myIndex');
```

Set the default data index. Has the same effect than the `defaultIndex` constructor option.

---

## Return Value

Returns the `Kuzzle` SDK object to allow chaining.
