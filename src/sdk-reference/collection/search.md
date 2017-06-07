---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: search
---

# search

```js
const
  body = {
    query: {
      bool: {
        must: [
          {
            terms: {status: ['idle', 'wantToHire', 'toHire', 'riding']}
          },
          {
            term: {type: 'cab'}
          },
          {
            geo_distance: {
              distance: '10km',
              pos: {lat: '48.8566140', lon: '2.352222'}
            }
          }
        ]
      }
    },
    sort: [
      'status',
      {
        _geo_distance : {
          pos: {lat: '48.8566140', lon: '2.352222'},
          order : "asc"
        }
      },
      {date: "desc"}
    ],
    aggregations: {
      aggs_name: {
        terms: {
          field: "field_name"
        }
      }
    }
  },
  options= {
    from: 0,
    size: 20
  };

// Using callbacks (NodeJS or Web Browser)
kuzzle
  .collection('collection', 'index')
  .search(body, options, function (err, searchResult) {
    searchResult.getDocuments().forEach(function(document) {
      console.log(document.toString());
    });
  });

// Using promises (NodeJS only)
kuzzle
  .collection('collection', 'index')
  .searchPromise(body, options)
  .then(searchResult => {
    searchResult.getDocuments().forEach(document => {
      console.log(document.toString());
    });
  });
```

```java
import io.kuzzle.sdk.core.Kuzzle;
import io.kuzzle.sdk.core.Options; 

Kuzzle kuzzle = new Kuzzle("localhost");

JSONObject body = new JSONObject()
  .put("query", new JSONObject()
    .put("bool", new JSONObject()
      .put("must", new JSONArray()
        .put(
          new JSONObject().put("terms",
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
          new JSONObject().put("term",
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
      )
    )
  )
  .put("sort", new JSONArray()
    .put("status")
    .put(new JSONObject()
      .put("_geo_distance", new JSONObject()
        .put("pos", new JSONObject()
          .put("lat", "48.8566140")
          .put("lon", "2.352222")
        )
        .put('order'; "asc")
      )
    )
    .put(new JSONObject()
      .put("date", "desc")
    )
  )
  .put("aggregations", new JSONObject()
    .put("aggs_name", new JSONObject()
      .put("terms", new JSONObject()
        .put("field", "field_name")
      )
    )
  );

Options options = new Options();
options.setFrom((long) 0);
options.setSize((long) 20);

kuzzle
  .collection("collection", "index")
  .search(body, options, new ResponseListener<SearchResult>() {
    @Override
    public void onSuccess(SearchResult searchResult) {
      for (Document doc : searchResult.getDocuments()) {
        // Get documents
      }

      searchResult.getTotal(); // return total of documents returned

      searchResult.getAggregations(): // return a JSONObject representing the aggregations response
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
use \Kuzzle\Document;
use \Kuzzle\Util\SearchResult;

$body = [
  'query' => [
    'bool' => [
      'must' => [
        [
          'terms' => ['status' => ['idle', 'wantToHire', 'toHire', 'riding']]
        ],
        ['term' => 'cab'],
        [
          'geo_distance' => [
            'distance' => '10km',
            'pos' => [
              'lat' => '48.8566140',
              'lon' => '2.352222'
            ]
          ]
        ]
      ]
    ]
  ],
  'sort' => [
    'status',
    [
      '_geo_distance' => [
        'pos' => ['lat' => '48.8566140', 'lon' => '2.352222'],
        'order' => 'asc'
      ]
    ],
    ['date' => 'desc']
  ],
  'aggregations' => [
    'aggs_name' => [
      'terms' => [
        'field' => 'field_name'
      ]
    ]
  ]
];

$options = [
  'from' => 0,
  'size' => 20
];

$kuzzle = new Kuzzle('localhost');
$dataCollection = $kuzzle->collection('collection', 'index');

try {
  $searchResult = $dataCollection->search($body, options);

  // $searchResult instanceof SearchResult
  $searchResult->getTotal();

  foreach($searchResult->getDocuments() as $document) {
    // $document instanceof Document
  }

  // return an array representing the aggregations response
  $searchResult->getAggregations();
}
catch (ErrorException $e) {

}
```

Executes a search on the data collection.

<aside class="notice">
  There is a small delay between documents creation and their existence in our search layer, usually a couple of seconds. That means that a document that was just been created won't be returned by this function
</aside>

## Processing large data sets

When processing a large number of documents (i.e. more than 1000), using `search` requests only are not the best option.

Pagination of results can be done by using the from and size but the cost becomes prohibitive when the deep pagination is reached. In fact, Elasticsearch, the database Kuzzle is relying on, prevents to go beyond than 10000 results by default.

Instead, the recommended way to process a large number of documents is to use [`Collection.scroll`]({{ site_base_path }}sdk-reference/collection/scroll/) or, easier, [`SearchResult.fetchNext`]({{ site_base_path }}sdk-reference/search-result/fetch-next).

See [`SearchResult.fetchNext`]({{ site_base_path }}sdk-reference/search-result/fetch-next/#how-to-process-all-documents-from-a-collection) for an example of how to process all documents from a collection.



---

## search(body, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``body`` | JSON object | Search request body, using [ElasticSearch Query DSL](https://www.elastic.co/guide/en/elasticsearch/reference/5.x/search-request-body.html) format |
| ``options`` | JSON object | Optional parameters |
| ``callback`` | function | Callback handling the response |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``from`` | number | Provide the starting offset of the request (used to paginate results) | ``0`` |
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |
| ``scroll`` | string | Start a scroll session, with a time to live equals to this parameter's value following the [Elastisearch time format](https://www.elastic.co/guide/en/elasticsearch/reference/5.0/common-options.html#time-units) | ``undefined`` |
| ``size`` | number | Provide the maximum number of results of the request (used to paginate results) | ``10`` |

<aside class="notice">
  To get more information about scroll sessions, please refer to the <a href="{{ site_base_path }}api-documentation/controller-document/search">API reference documentation</a>.
</aside>

---

## Callback response

Resolves to an instance of [SearchResult]({{ site_base_path }}sdk-reference/search-result).
