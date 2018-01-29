---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: scrollSpecifications
---

# scrollSpecifications

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle
  .collection('collection', 'index')
  .scrollSpecifications(scrollId, {scroll: '1m'}, function (err, res) {
    res.hits.forEach(function (specification) {
      console.log(specification);      
    });
    
    res.total // Total specifications count
  });

// Using promises (NodeJS only)
kuzzle
  .collection('collection', 'index')
  .scrollSpecificationsPromise(scrollId, {scroll: '1m'})
  .then(res => {
    res.hits.forEach(specification => {
      console.log(specification);
    });
    
    res.total // Total specifications count
  });
```

```java
Options opts = new Options();
opts.setScroll("1m");

kuzzle
  .collection("collection", "index")
  .scrollSpecifications(scrollId, opts, new ResponseListener<JSONObject>() {
    @Override
    public void onSuccess(JSONObject res) {
      for (int i = 0; i < res.getJSONArray("hits").length(); i++) {
          res.getJSONArray("hits").getJSONObject(i) // Specification
      }

      res.getString("total"); // Total specifications count
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
$dataCollection = $kuzzle->collection('collection', 'index');

try {
  $res = $dataCollection->scrollSpecifications($scrollId, ['scroll' => '1m']);

  foreach ($res['hits'] as $specification) {
    // Specification
  }
  
  // Total specifications count
  $res['total'];
}
catch (ErrorException $e) {

}
```

> Callback response

```json
{
  "hits": [
    {"first": "specification"},
    {"second": "specification"}
  ],
  "total": 2
}
```

Returns a JSON object containing the next page of the scroll session, and the `scrollId` to be used in the next `scroll` action.  
A scroll session is always initiated by a `searchSpecification` action with the `scroll` argument.

---

## scrollSpecifications(scrollId, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``scrollId`` | string | The "scrollId" provided with the last scrollSpecifications response or from the initial searchSpecifications request |
| ``options`` | JSON object | Optional parameters |
| ``callback`` | function | Callback handling the response |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Make this request queuable or not  | ``true`` |
| ``scroll`` | string | Re-initializes the scroll session timeout to its value. If not defined, the scroll timeout is defaulted to a Kuzzle Backend configuration | ``undefined`` |
