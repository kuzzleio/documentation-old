---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: on
---

# on

```js
  var callback = function () {
    // Actions to perform when receiving a 'document' notification
  };
  room.on('document', callback);
```

```java
EventListener eventListener = new EventListener() {
  @Override
  public void trigger(Object... args) {
    // Actions to perform when receiving a 'document' notification
  }
};
kuzzle.addListener("document", eventListener);
```

```php
<?php

// not implemented (this SDK uses HTTP and is thus stateless)

```

Adds a listener to a Room notification. When a notification is received, listeners are called in the order of their insertion.

See the [event handling]({{ site_base_path }}sdk-reference/essentials/notifications) section for more details.

---

## on(event, listener)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``event`` | string | 'document' or 'user' |
| ``listener`` | function | The function to call each time one of the registered event is fired |

---

## Return value

Returns the `Room` object to allow chaining.
