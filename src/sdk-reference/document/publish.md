---
layout: side-code.html.hbs
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: publish
---

# publish

```js
document.publish();
```

```java
document.publish();
```

```php
<?php

use \Kuzzle\Document;

// ...

/**
 * @var $document Document
 */

try {
  $document->publish();
} catch (ErrorException $e) {

}
```

Publishes the content of this document as a real-time message.

---

## publish([options])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``options`` | JSON Object | Optional parameters |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``volatile`` | JSON Object | Additional information passed to notifications to other users | ``null`` |
| ``queuable`` | boolean | Make this request queuable or not  | ``true`` |

---

## Return Value

Returns this `Document` object to allow chaining.
