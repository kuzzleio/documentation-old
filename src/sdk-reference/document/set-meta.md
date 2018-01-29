---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: setMeta
---

# setMeta

```js
document.setMeta({metaAttribute: 'metaValue'}, true);
```

```java
JSONObject metadata = new JSONObject().put("metaAttribute", "metaValue");

document.setMeta(metadata, true);
```

```php
<?php

use \Kuzzle\Document;

// ...

$metadata = [
  'metaAttribute' => 'metaValue'
];

/**
 * @var $document Document
 */
$document->setMeta($metadata);
```

Replaces or updates the current document [metadata]({{ site_base_path }}guide/essentials/document-metadata/) with the provided ones.  
This is a helper function returning a reference to itself so that you can easily chain calls.

<aside class="notice">
Changes made by this function won't be applied until the <code>save</code> method is called
</aside>

---

## setMeta(meta, [replace])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``meta`` | JSON Object | New metadata |
| ``replace`` | boolean | true: replaces the current metadata with the provided ones, otherwise merges it |

**Note:** by default, the ``replace`` argument is set to ``false``

---

## Return Value

Returns this `Document` object to allow chaining.
