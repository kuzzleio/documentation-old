---
layout: side-code.html
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

If the previous request was a search action which provided `from` and `size` arguments,
`fetchNext` will add `size` to `from` and make a new search request.
