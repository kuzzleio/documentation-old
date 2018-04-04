---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: addListener
---

# addListener

```js
  var callback = function () {
    // Actions to perform when receiving a 'connected' global event
  };
  kuzzle.addListener('connected', callback);
```

```java
EventListener eventListener = new EventListener() {
  @Override
  public void trigger(Object... args) {
    // Actions to perform when receiving a 'subscribed' global event
  }
};
kuzzle.addListener(Event.connected, eventListener);
```

```php
<?php

$kuzzle->addListener('queryError', function() {
  // Actions to perform when receiving a 'queryError' global event
});

```

Adds a listener to an event. When an event is fired, listeners are called in the order that they are added.

---

## addListener(event, listener)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``event`` | string | One of the event described in the ``Event Handling`` section of this documentation |
| ``listener`` | function | The function to call each time one of the registered event is fired |

---

## Return Value

Returns the `Kuzzle` object to allow chaining.
