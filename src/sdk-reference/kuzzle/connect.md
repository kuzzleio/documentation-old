---
layout: side-code.html.hbs
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: connect
---

# connect

```js
kuzzle.connect();
```

```java
kuzzle.connect();
```

```php
<?php

// not implemented (this SDK uses HTTP and is thus stateless)
```

Connects to Kuzzle using the `host` parameter provided in the constructor.
Has no effect if ``connect`` is set to ``auto``, unless ``disconnect`` has been called first.

---

## Return value

Returns the `Kuzzle` object to allow chaining.

---

## Callback Response

If a callback has been provided to the `Kuzzle` constructor, it will be called with the `Kuzzle` instance once connected to Kuzzle
