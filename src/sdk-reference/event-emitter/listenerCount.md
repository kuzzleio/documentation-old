---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: listenerCount
---

# listenerCount

```js
kuzzle.on('connected', cb1);
kuzzle.on('connected', cb2);

var nbListeners = kuzzle.listenerCount('connected');
// => 2
```

```java
kuzzle.on(Event.connected, listener1);
kuzzle.on(Event.connected, listener2);

Integer nbListeners = kuzzle.listenerCount(Event.connected);
// => 2
```

```php
<?php

  $kuzzle.on('queryError', $cb1);
  $kuzzle.on('queryError', $cb2);

  $nbListeners = $kuzzle->listenerCount('queryError');
  // => 2

```

Returns the number of callbacks who listen to an event.

---

## listenerCount(event)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``event`` | string | One of the event described in the ``Event Handling`` section of this documentation |

---

## Return value

Returns the number of callbacks who listen to an event.
