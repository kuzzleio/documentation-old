---
layout: side-code.html.hbs
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: renew
---

# renew

```js
room.renew(function (err, res) {
  // handles the subscription result
});
```

```java
room.renew(new ResponseListener<Room>() {
  // Handle the subscription result
});
```

```php
<?php

// not implemented (this SDK uses HTTP and is thus stateless)
```

Renew the subscription. Force a new subscription using the same filters.

Unsubscribes first if this `Room` object was already listening to events.

---

## renew(subscriptionCallback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``subscriptionCallback`` | function | Function called with the subscription result |
