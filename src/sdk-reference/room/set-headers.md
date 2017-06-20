---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: setHeaders
---

# setHeaders

```js
room.setHeaders({someContent: 'someValue'}, true);
```

```java
JSONObject headers = new JSONObject();
headers.put("someContent", "someValue");
room.setHeaders(headers, true);
```

```php
<?php

// not implemented (this SDK uses HTTP and is thus stateless)
```

> Returns itself

This is a helper function returning itself, allowing to easily chain calls.

---

## setHeaders(content, [replace])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``content`` | JSON Object | New content |
| ``replace`` | boolean | true: replace the current content with the provided data, false: merge it |

**Note:** by default, the ``replace`` argument is set to ``false``

---

## Return value

Returns this `Room` object to allow chaining.
