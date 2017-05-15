---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: removeAllListeners
---

# removeAllListeners

```js
// Removes all listeners on the "unsubscribed" global event
kuzzle.removeAllListeners('disconnected');

// Removes all listeners on all global events
kuzzle.removeAllListeners();
```

```java
// Removes all listeners on the "unsubscribed" global event
kuzzle.removeAllListeners(Event.disconnected);

// Removes all listeners on all global events
kuzzle.removeAllListeners();
```

```php
<?php
use \Kuzzle\Kuzzle;

$kuzzle = new Kuzzle('localhost');

// Removes all listeners on the "jwtTokenExpired" global event
$kuzzle->removeAllListeners('jwtTokenExpired');

// Removes all listeners on all global events
$kuzzle->removeAllListeners();
```

Removes all listeners, either from a specific event or from all events

---

## removeAllListeners([event])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``event`` | string | One of the event described in the ``Event Handling`` section of this documentation |

---

## Return value

Returns the `Kuzzle` object to allow chaining.
