---
layout: side-code.html
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

Closes the current connection.  
Kuzzle state is now `disconnected`. You can't make any API call before an other call to [connect()]({{ site_base_path }}sdk-reference/kuzzle/connect).  
This action does not trigger a `disconnected` event since this event is triggered when an unexpected disconnection occur.
