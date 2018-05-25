---
layout: side-code.html.hbs
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: on (addListener)
---

# on
_alias: `addListener`_

```js
var callback = function () {
  // Actions to perform when receiving a 'connected' global event
};

kuzzle.on('connected', callback);
```

```java
EventListener eventListener = new EventListener() {
  @Override
  public void trigger(Object... args) {
    // Actions to perform when receiving a 'connected' global event
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

## on(event, listener)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``event`` | string | One of the event described in the [Event Handling]({{ site_base_path }}sdk-reference/essentials/events/) section of this documentation |
| ``listener`` | function | The function to call each time one of the registered event is fired |

---

## Return Value

Returns the `KuzzleEventEmitter` object to allow chaining.
