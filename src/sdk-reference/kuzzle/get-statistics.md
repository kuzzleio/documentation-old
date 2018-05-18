---
layout: side-code.html.handlebars
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: getStatistics
---

# getStatistics

> Without argument, retrieves the last statistic frame in an array:

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.getStatistics(function (err, statistics) {
});

// Using promises (NodeJS only)
kuzzle
  .getStatisticsPromise()
  .then(statistics => {
  });
```

```java
kuzzle.getStatistics(new ResponseListener<JSONObject>() {
  @Override
  public void onSuccess(JSONObject[] statistics) {
    // ...
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

$kuzzle = new Kuzzle('localhost');
$statistics = $kuzzle->getStatistics();

// $statistics is an array of statistics
```

> Callback response:

```json
[
  {
    "connections": { "socketio": 1 },
    "ongoingRequests": { "rest": 0, "socketio": 0 },
    "completedRequests": { "mqtt": 37, "socketio": 17 },
    "failedRequests": { "socketio": 1 },
    "timestamp": "1453110641308"
  }
]
```

> When providing a timestamp, retrieves all frames recorded after that timestamp:

```js
// Date can be either in ISO format or a timestamp (utc, in milliseconds)
var ts = Date.parse('2015-10-26T12:19:10.213Z');

// Using callbacks (NodeJS or Web Browser)
kuzzle.getStatistics(ts, function (error, statistics) {

});

// Using promises (NodeJS only)
kuzzle
  .getStatisticsPromise(ts)
  .then(statistics => {

  });
```

```java
// Date can be either in ISO format or a timestamp (utc, in milliseconds)
kuzzle.getStatistics("2015-11-15T13:36:45.558Z", new ResponseListener<JSONObject[]>() {
  @Override
  public void onSuccess(JSONObject[] statistics) {
    // ...
  }

  @Override
  public void onError(JSONObject error) {
    // Handle error
  }
};
```

```php
<?php
use \Kuzzle\Kuzzle;

$kuzzle = new Kuzzle('localhost');
// Date can be either in ISO format or a timestamp (utc, in milliseconds)
$date = time() * 1000;
$statistics = $kuzzle->getStatistics($date);

// $statistics is an array of statistics objects
```

> Callback response

```json
[
  {
    "connections": { "socketio": 1 },
    "ongoingRequests": { "rest": 0, "socketio": 0 },
    "completedRequests": { "mqtt": 37, "socketio": 17 },
    "failedRequests": { "socketio": 1 },
    "timestamp": "1453110641308"
  },
  {
    "connections": { "socketio": 1 },
    "ongoingRequests": { "rest": 0, "socketio": 0 },
    "completedRequests": { "socketio": 34 },
    "failedRequests": { "socketio": 3 },
    "timestamp": "1453110642308"
  },
  {
    "connections": {},
    "ongoingRequests": { "rest": 0, "socketio": 0 },
    "completedRequests": { "socketio": 40 },
    "failedRequests": {},
    "timestamp": "1453110643308"
  }
]
```

Kuzzle Backend monitors active connections, and ongoing/completed/failed requests.  
This method returns either the last statistics frame, or a set of frames starting from a provided timestamp.

---

## getStatistics([timestamp], [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``timestamp`` | Epoch time | Optional starting time from which the frames are to be retrieved |
| ``options`` | JSON object | Optional parameters |
| ``callback`` | function | Callback handling the response |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Make this request queuable or not  | ``true`` |

**Note:** Kuzzle statistics are cleaned up regularly. If the timestamp is set too far in the past, then this method will return all available statistics.

---

### Callback Response

Returns an `array` containing one or more statistics frame (as JSON objects).
