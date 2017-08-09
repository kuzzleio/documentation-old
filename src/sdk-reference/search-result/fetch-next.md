---
layout: side-code.html
words: 520
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: fetchNext
---

# fetchNext

```js
// Using callbacks (NodeJS or Web Browser)
searchResult.fetchNext(function (error, nextSearchResult) {
  // called once the fetchNext action has been completed
  // nextSearchResult is an instantiated SearchResult object
});

// Using promises (NodeJS)
searchResult.fetchNextPromise()
  .then(nextSearchResult => {
    // called once the fetchNext action has been completed
    // nextSearchResult is an instantiated SearchResult object
  });
```

```java
searchResult.fetchNext(new ResponseListener<SearchResult>() {
  @Override
  public void onSuccess(SearchResult nextSearchResult) {
    // called once the fetchNext action has been completed
    // nextSearchResult is an instantiated SearchResult object
  }

  @Override
  public void onError(JSONObject error) {
    // Handle error
  }
});
```

```php
<?php

use \Kuzzle\SearchResult;

// ...

/**
 * @var $searchResult SearchResult
 */

try {
  $nextSearchResult = $searchResult->fetchNext();
} catch (ErrorException $e) {
    // Handle error
}
```

Fetches the next SearchResult, by triggering a new search/scroll request depending on the options and filters of the SearchResult.

If the previous request was a search or a scroll action which provided a `scroll` argument,
`fetchNext` will use the `scrollId` retrieved from the current result to make a new scroll request.

If the previous request was a search action which provided `size` argument and `sort` filtering,
`fetchNext` will use Elasticsearch's [`search_after`](https://www.elastic.co/guide/en/elasticsearch/reference/master/search-request-search-after.html) mechanism, which can efficiently search through a large volume of document, bypassing internal hard limits<sup>\[1\]</sup>,
but at the cost of reflecting the latest changes of the index, as opposed to using scroll.

If the previous request was a search action which provided `from` and `size` arguments,
`fetchNext` will add `size` to `from` and make a new search request.

---

## How to process every document of a collection

```js
var processDocument = function (document) {
  // do something with the document
};

kuzzle
  .collection('collection', 'index')
  .search({
    from: 0,
    size: 1000,
    scroll: '30s',
    query: {}
  }, function getMoreUntilDone (error, searchResult) {
    if (searchResult === null) {
      return;
    }
    
    searchResult.documents.forEach(function (document) {
      processDocument(document);
    });
    
    searchResult.fetchNext(getMoreUntilDone);
  });
```

```java
import io.kuzzle.sdk.core.Kuzzle;
import io.kuzzle.sdk.core.Options;

Kuzzle kuzzle = new Kuzzle("localhost");

JSONObject filter = new JSONObject();

Options options = new Options();
options.setFrom((long) 0);
options.setSize((long) 1000);
options.setScroll("30s");

ResponseListener<SearchResult> listener = new ResponseListener<SearchResult>() {
  @Override
  public void onSuccess(SearchResult searchResult) {
    if (searchResult == null) {
      return;
    }

    for (Document doc : searchResult.getDocuments()) {
      // do something with the document
      // this.processDocument(doc);
    }

    searchResult.fetchNext(this);
  }

  @Override
  public void onError(JSONObject error) {
    // handle errors here
  }
};

kuzzle
  .collection("collection", "index")
  .search(filter, options, listener);
```

```php
<?php

use \Kuzzle\Kuzzle;
use \Kuzzle\Document;
use \Kuzzle\Util\SearchResult;

function processDocument ($doc) {
  // do something with the document
}

$kuzzle = new Kuzzle('localhost');
$collection = $kuzzle->collection('collection', 'index');

try {
  $searchResult = $collection->search([
    'from' => 0,
    'size' => 1000,
    'scroll' => '30s',
    'filter' => []
  ]);
  
  while ($searchResult !== null) {
    foreach ($searchResult->getDocuments() as $doc) {
      procesDocument($doc);
    }
    
    $searchResult = $searchResult->fetchNext();
  }
}
catch (ErrorException $e) {
  // Handle errors here
}
```

The safest way to process all documents in a collection is to retrieve them by batch to avoid memory exhaustion and possibly hitting some hard limits<sup>\[1\]</sup> from the database layer.

<aside class="warning">Make sure your first search request includes <code>size</code> and <code>scroll</code> parameters</aside>

<aside class="notice"><sup>\[1\]</sup> Elasticsearch limits the number of documents inside a single page to [10,000 by default](https://www.elastic.co/guide/en/elasticsearch/reference/current/index-modules.html#dynamic-index-settings).</aside>
