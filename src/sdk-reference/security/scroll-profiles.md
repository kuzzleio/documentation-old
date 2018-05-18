---
layout: side-code.html.handlebars
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
| ``queuable`` | boolean | Make this request queuable or not  | ``true`` |

---

## Callback Response

Returns the list of fetched security profiles according to the scroll parameters (offset, limit etc.).
