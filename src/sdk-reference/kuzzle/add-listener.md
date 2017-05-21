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

$kuzzle->addListener('jwtTokenExpired', function() {
  // Actions to perform when receiving a 'jwtTokenExpired' global event
});

```

Adds a listener to a Kuzzle global event. When an event is fired, listeners are called in the order of their insertion.

See the [event handling]({{ site_base_path }}sdk-reference/essentials/events) section for a full events list.

---

## addListener(event, listener)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``event`` | string | One of the event described in the ``Event Handling`` section of this documentation |
| ``listener`` | function | The function to call each time one of the registered event is fired |

---

## Return value

Returns the `Kuzzle` object to allow chaining.
