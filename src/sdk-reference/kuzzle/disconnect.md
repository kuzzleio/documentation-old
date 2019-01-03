---
layout: side-code.html.hbs
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: disconnect
---

# disconnect

```js
kuzzle.disconnect();
```
```java
kuzzle.disconnect();
```

```php
<?php

// not implemented (this SDK uses HTTP and is thus stateless)
```

Closes the current connection, and frees all allocated resources.  
Contrary to the `offline` state (when the network connection is unexpectedly lost), `disconnect()`  invalidates the instance, which cannot be used until [connect()]({{ site_base_path }}sdk-reference/kuzzle/connect) is explicitly called.  
This action does not trigger a `disconnected` event since this event is triggered when an unexpected disconnection occur.  
