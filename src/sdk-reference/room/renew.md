---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: renew
---

# renew

```js
room.renew({in: {field: ['some', 'new', 'filter']}}, function (err, res) {
  // called each time a change is detected on documents matching this filter

  // check the Room/Notifications section of this documentation
  // to get notification examples
}, function (err, res) {
  // handles the subscription result
});
```

```java
JSONObject filter = new JSONObject()
  .put("and", new JSONArray()
    .put(
      new JSONObject().put("in",
        new JSONObject().put("status",
          new JSONArray()
            .put("idle")
            .put("wantToHire")
            .put("toHire")
            .put("riding")
        )
      )
    )
    .put(
      new JSONObject().put("in",
        new JSONObject()
          .put("type", new JSONArray().put("cab"))
      )
    )
    .put(
      new JSONObject().put("geo_distance",
        new JSONObject()
          .put("distance", "10km")
          .put("pos",
            new JSONObject()
              .put("lat", "48.8566140")
              .put("lon", "2.352222")
          )
      )
    )
  );

room.renew(filters, new ResponseListener<NotificationResponse>() {
 @Override
 public void onSuccess(NotificationResponse result) throws Exception {
   // called each time a change is detected on documents matching this filter

   // check the Room/Notifications section of this documentation
   // to get notification examples
 }

 @Override
 public void onError(JSONObject error) throws Exception {
   // Handle error
 }
}, new ResponseListener<Room>() {
  // Handle the subscription result
});
```

```php
<?php

// not implemented (this SDK uses HTTP and is thus stateless)
```

Renew the subscription. Force a new subscription using the same filters if no new ones are provided.

Unsubscribes first if this `Room` object was already listening to events.

---

## renew([filters], notificationCallback, subscriptionCallback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``filters`` | JSON Object | [Filters]({{ site_base_path }}kuzzle-dsl) |
| ``notificationCallback`` | function | Function called each time a [notification]({{ site_base_path }}sdk-reference/essentials/notifications) is received |
| ``subscriptionCallback`` | function | Function called with the subscription result |
