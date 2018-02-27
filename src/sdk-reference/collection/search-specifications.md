---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: searchSpecifications
---

# searchSpecifications

```js
const
  filters = {
    match_all: {
      boost: 1
    }
  },
  options= {
    from: 0,
    size: 20
  };

// Using callbacks (NodeJS or Web Browser)
kuzzle
  .collection('collection', 'index')
  .searchSpecifications(filters, options, function (err, res) {
    res.hits.forEach(function (specification) {
      console.log(specification);
    });
    
    res.total // Total specifications count
  });

// Using promises (NodeJS only)
kuzzle
  .collection('collection', 'index')
  .searchSpecificationsPromise(filters, options)
  .then(res => {
    res.hits.forEach(specification => {
      console.log(specification);
    });
    
    res.total // Total specifications count
  });
```

```java
import io.kuzzle.sdk.core.Kuzzle;
import io.kuzzle.sdk.core.Options; 

Kuzzle kuzzle = new Kuzzle("localhost");

JSONObject filters = new JSONObject()
   .put("match_all", new JSONObject()
       .put("boost", 1)
   );

Options options = new Options();
options.setFrom((long) 0);
options.setSize((long) 20);

kuzzle
  .collection("collection", "index")
  .searchSpecifications(filters, options, new ResponseListener<JSONObject>() {
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

$filters = [
    "match_all" => [
        "boost" => 1
    ]
];

$options = [
  'from' => 0,
  'size' => 20
];

$kuzzle = new Kuzzle('localhost');
$dataCollection = $kuzzle->collection('collection', 'index');

try {
  $res = $dataCollection->searchSpecifications($filters, $options);
  
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
  "total": 2,
  "scrollId": "foobar"
}
```

Retrieves every specifications across indexes/collections according to the given filters.

---

## searchSpecifications(filters, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``filters`` | JSON object | Search request body, using [ElasticSearch Query DSL](https://www.elastic.co/guide/en/elasticsearch/reference/5.x/search-request-body.html) format. <br>If given an empty object, matches all specifications across index/collections |
| ``options`` | JSON object | Optional parameters |
| ``callback`` | function | Callback handling the response |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``from`` | number | Provide the starting offset of the request (used to paginate results) | ``0`` |
| ``queuable`` | boolean | Make this request queuable or not  | ``true`` |
| ``scroll`` | string | Start a scroll session, with a time to live equals to this parameter's value following the [Elastisearch time format](https://www.elastic.co/guide/en/elasticsearch/reference/5.0/common-options.html#time-units) | ``undefined`` |
| ``size`` | number | Provide the maximum number of results of the request (used to paginate results) | ``10`` |
