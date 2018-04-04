---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: room
---

# room

```js
let room = kuzzle
  .collection('collection', 'index')
  .room({in: {field: ['some', 'filter']}})
  .on('document', functon (err, res) {
    // handle notifications
  })
  .subscribe();
```

```java
JSONObject filters = new JSONObject()
  .put("in",
    new JSONObject("field")
      .put(new JSONArray()
        .put("some")
        .put("filter")
      )
  );

Room room = kuzzle.collection("collection", "index")
  .room(filters)
  .on(new ResponseListener<NotificationResponse>() {
    @Override
      public void onSuccess(NotificationResponse object) {
        // handle notifications
      }

      @Override
      public void onError(JSONObject error) {
        // Handle notifications error
      }
  })
  .subscribe();
```

```php
<?php

// not implemented (this SDK uses HTTP and is thus stateless)
```

Creates a new [Room]({{ site_base_path }}sdk-reference/room/) object, using its constructor.

---

## room([options])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``filters`` | JSON Object | [Filters]({{ site_base_path }}kuzzle-dsl) |
| ``options`` | object | Subscription configuration |

## Options

Provided options are passed directly to the [Room]({{ site_base_path }}sdk-reference/room/) object constructor.

---

## Return Value

Returns the newly created [Room]({{ site_base_path }}sdk-reference/room/) object.
