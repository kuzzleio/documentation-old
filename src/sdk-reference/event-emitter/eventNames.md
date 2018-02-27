---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: eventNames
---

# eventNames

```js
kuzzle.on('connected', connectCB);
kuzzle.on('networkError', errorCB)

var events = kuzzle.eventNames();
// => ['conneted', 'networkError']
```

```java
kuzzle.on(Event.connected, connectEventListener);
kuzzle.on(Event.error, errorEventListener);

List<String> events = room.eventNames();
// => List("connected", "error")
```

```php
<?php

  $kuzzle.on('loginAttempt', $loginCB);
  $kuzzle.on('queryError', $errorCB);

  $events = $kuzzle->eventNames();
  // => Array('loginAttempt', 'queryError')
```

Returns an array listing the event names for which the emitter has listeners registered.

