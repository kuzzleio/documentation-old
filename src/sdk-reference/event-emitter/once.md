---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: once
---

# once

```js
var callback = function () {
  // Actions to perform the first time we receive a 'connected' global event
};

kuzzle.once('connected', callback);
```

```java
EventListener eventListener = new EventListener() {
  @Override
  public void trigger(Object... args) {
    // Actions to perform the the first time we receive a 'connected' global event
  }
};

kuzzle.once(Event.connected, eventListener);
```

```php
<?php

$kuzzle->once('connected', function() {
  // Actions to perform the first time we receive a 'connected' global event
});

```

Adds a **one time** listener to an event.

The next time the event is triggered, the listener is removed and then invoked.

---

## once(event, listener)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``event`` | string | One of the event described in the [Event Handling]({{ site_base_path }}sdk-reference/essentials/events/) section of this documentation |
| ``listener`` | function | The function to call each time one of the registered events is fired |

---

## Return vVlue

Returns the `KuzzleEventEmitter` object to allow chaining.
