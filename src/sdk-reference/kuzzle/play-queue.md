---
layout: side-code.html.hbs
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: playQueue
---

# playQueue

```js
kuzzle.playQueue();
```

```java
kuzzle.playQueue();
```

```php
<?php

// not implemented (this SDK uses HTTP and is thus stateless)
```

Replays the requests queued during offline mode. Works only if the SDK is not in a ``disconnected`` state, and if the ``autoReplay`` option is set to ``false``.

---

## Return Value

Returns the `Kuzzle` SDK object to allow chaining.
