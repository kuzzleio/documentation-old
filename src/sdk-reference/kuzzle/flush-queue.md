---
layout: side-code.html.handlebars
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: flushQueue
---

# flushQueue

```js
kuzzle.flushQueue();
```

```java
kuzzle.flushQueue();
```

```php
<?php

// not implemented (this SDK uses HTTP and is thus stateless)
```

Empties the offline queue without replaying it.

---

## Return Value

Returns the `Kuzzle` SDK instance to allow chaining.
