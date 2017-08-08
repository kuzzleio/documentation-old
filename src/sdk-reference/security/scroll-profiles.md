---
layout: side-code.html
words:  192
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: scrollProfiles
---

# scrollProfiles

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle
  .security
  .scrollProfiles(scrollId, options, function(error, result) {
    // called once the scroll action has been completed
  });
```

```java
kuzzle
  .security
  .scrollProfiles(scrollId, options, new ResponseListener<SecurityDocumentList>() {
    @Override
    public void onSuccess(SecurityDocumentList response) {
      // called once the scroll action has been completed
    }

    @Override
    public void onError(JSONObject error) {
      // Handle error
    }
  });
```

```php
<?php

use \Kuzzle\Kuzzle;

$scrollId = 'myScrollId';
$options = [];

$kuzzle = new Kuzzle('localhost');

try {
  $kuzzle->security()->scrollProfiles($profileId, $options);
}
catch (ErrorException $e) {
  // Handle error
}
```

Scrolls on stored profiles using the provided scroll ID.

---

## scrollProfiles(scrollId, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``scrollId`` | string | Scroll identifier retrieved from a search query |
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Callback handling the response |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

---

## Callback response

Resolves the list of retrieved profiles according to the scroll parameters (offset, limit etc.).
