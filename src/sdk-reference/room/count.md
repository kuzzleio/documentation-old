---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: count
---

# count

```js
// Using callbacks (NodeJS or Web Browser)
room.count(function (error, result) {
  // ...
});

// Using promises (NodeJS)
room.countPromise().then(result => {
  // ...
});
```

```java
room.count(new ResponseListener<Integer>() {
 @Override
 public void onSuccess(Integer result) throws Exception {
   //  ...
 }

 @Override
 public void onError(JSONObject error) throws Exception {
   // Handle error
 }
});
```

```php
<?php

// not implemented (this SDK uses HTTP and is thus stateless)
```

> Callback response

```json
1
```

Return the number of subscribers on that room

---

## count(callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``callback`` | function | Callback handling the response |

---

## Callback response

Resolves to a `integer` containing the number of users subscribing to this room.
