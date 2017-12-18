---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: connect
---

# connect

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.connect(function (err, kuzzle) {
  if (err) {
    console.log('Unable to connect: ', err.message);
  } else {
    console.log('Connected!');
  }
});

// Using promises (NodeJS only)
kuzzle.connectPromise()
  .then(() => console.log('Connected!'));
```

```java
kuzzle.connect(new ResponseListener<Void>() {
 @Override
 public void onSuccess(Void object) {
   // invoked once connected
 }

 @Override
 public void onError(JSONObject error) {
   // Handle connection error
 }
});
```

```php
<?php

// not implemented (this SDK uses HTTP and is thus stateless)
```

Connects to the Kuzzle instance using the `host` and `port` parameters provided to the constructor.

---

## Callback response

Resolves with nothing once connected to a remote Kuzzle server.
