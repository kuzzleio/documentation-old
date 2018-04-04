---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: listeners
---

# listeners

```js
kuzzle.on('connected', cb1);
kuzzle.on('connected', cb2);

var callbacks = kuzzle.listeners('connected');
// => [cb1, cb2]
```

```java
kuzzle.on(Event.connected, listener1);
kuzzle.on(Event.connected, listener2);

EventList callbacks = kuzzle.listeners(Event.connected);
// => EventList (listener1, listener2)
```

```php
<?php

  $kuzzle.on('queryError', $cb1);
  $kuzzle.on('queryError', $cb2);

  $callbacks = $kuzzle->listeners('queryError');
  // => Array($cb1, $cb2)

```

Returns the list of callbacks that listen to the given event.

---

## listeners(event)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``event`` | string | One of the event described in the [Event Handling]({{ site_base_path }}sdk-reference/essentials/events/) section of this documentation |

---

## Return value

Returns an array of functions.
