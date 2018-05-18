---
layout: side-code.html.handlebars
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: stopQueuing
---

# stopQueuing

```js
kuzzle.stopQueuing();
```

```java
kuzzle.stopQueuing();
```

```php
<?php

// not implemented (this SDK uses HTTP and is thus stateless)
```

Stops the requests queuing. Works only in offline mode, and if the [autoQueue]({{ site_base_path }}sdk-reference/kuzzle/#properties) option is set to `false`.

---

## Return Value

Returns the `Kuzzle` SDK object to allow chaining.
