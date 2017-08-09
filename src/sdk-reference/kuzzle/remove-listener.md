---
layout: side-code.html
words: 78
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: removeListener
---

# removeListener

```js
kuzzle.removeListener('disconnected', callback);
```

```java
kuzzle.removeListener(Event.disconnected, eventListener);
```

```php
<?php
use \Kuzzle\Kuzzle;

$kuzzle = new Kuzzle('localhost');

$kuzzle->removeListener('queryError', $callback);
```

Removes a listener from an event.

---

## removeListener(event, callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``event`` | string | One of the event described in the ``Event Handling`` section of this documentation |
| ``callback`` | function/object | the callback |

---

## Return value

Returns the `Kuzzle` object to allow chaining.
