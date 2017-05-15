---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: updateSelf
---

# updateSelf

```js
var newContent = {
  firstname: 'My Name Is',
  lastname: 'Jonas'
};


// Using callbacks (NodeJS or Web Browser)
kuzzle
  .updateSelf(newContent, function (err, updatedUser) {

  });

// Using promises (NodeJS)
kuzzle
  .updateSelfPromise(newContent)
  .then(updatedUser => {

  });
```

```java
JSONObject newContent = new JSONObject()
  .put("firstname", "My Name Is")
  .put("lastname", "Jonas");

kuzzle
  .updateSelf(newContent, new ResponseListener<JSONObject>() {
    @Override
    public void onSuccess(JSONObject user) {

    }

    @Override
    public void onError(JSONObject error) {

    }
  });
```

```php
<?php
use \Kuzzle\Kuzzle;
use \Kuzzle\Security\User;

$kuzzle = new Kuzzle('localhost');
$newContent = [
  'firstname' => 'My Name Is',
  'lastname' => 'Jonas'
];

try {
  $updatedUser = $kuzzle->updateSelf($newContent);
  // $updatedUser instanceof User
}
catch (ErrorException $e) {

}
```

---

## updateSelf(content, [options], [callback])

Performs a partial update on the current user.

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``content`` | JSON Object | A plain javascript object representing the user |
| ``options`` | string | (Optional) Optional arguments |
| ``callback`` | function | (Optional) Callback handling the response |

---

## Options

| Filter | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

---

## Return value

Returns the `Kuzzle` object to allow chaining.

---

## Callback response

Resolves to the updated user plain object.
