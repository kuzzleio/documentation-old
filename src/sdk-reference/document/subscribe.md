---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: subscribe
---

# subscribe

```js
document
  .subscribe(function (error, notification) {
    // called each time a change occurs on this document
  })
  .onDone(function (error, roomObject) {
    // Handles the subscription result
  });

document
  .subscribe({subscribeToSelf: true, volatile: { myId: 'someId'}}, function (error, notification) {
    // called each time a change occurs on this document
  })
  .onDone(function (error, roomObject) {
    // Handles the subscription result
  });
```

```java
Room room = document.subscribe(new ResponseListener<NotificationResponse>() {
    @Override
    public void onSuccess(NotificationResponse object) {
      // called each time a change occurs on this document
    }

    @Override
    public void onError(JSONObject error) {
      // Handle error
    }
  })
  .onDone(new ResponseListener<Room>() {
    @Override
    public void onSuccess(Room response) {
      // Handle subscription success
    }

    @Override
    public void onError(JSONObject error) {
      // Handle subscription error
    }
  });
```

```php
<?php

// not implemented (this SDK uses HTTP and is thus stateless)
```

Listens to changes occuring on this document.
Throws an error if this document has not yet been created in Kuzzle.

The provided callback will be called everytime a [notification]({{ site_base_path }}sdk-reference/essentials/notifications) is received from Kuzzle.

---

## subscribe([options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``options`` | object | Subscription configuration |
| ``callback`` | function | Callback that will be called each time a change has been detected on this document |

---

## Options

Options are directly passed to the [Room]({{ site_base_path }}sdk-reference/room/) object constructor.

---

## Return value

Returns an object exposing the following method:  
  `onDone(callback)`

The `callback` argument is called when the subscription ends, either successfully or with an error.
