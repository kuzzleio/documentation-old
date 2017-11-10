---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: onDone
---

# onDone

```js
room.onDone(function (err, res) {
  // handles the subscription result
});
```

```java
room.onDone(new ResponseListener<Room>() {
 @Override
 public void onSuccess(Room result) throws Exception {
  // Handle the subscription result
 }

 @Override
 public void onError(JSONObject error) throws Exception {
   // Handle error
 }
});
```

```php
<?php

// not implemented (this SDK uses HTTP and is thus stateless)
```

Calls a callback when the subscription ends, either successfully or with an error.

---

## onDone(callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``callback`` | function | Function called with the subscription result |
