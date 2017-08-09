---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: SearchResult
description: Search result navigation class
show-subheader: true
subheader-title: Constructor
---

# Constructor

```js
/*
 Constructors are not exposed in the JS/Node SDK.
 SearchResult objects are returned by search and scroll Collection methods.
 */

kuzzle.collection('collection', 'index').search({}, (error, searchResult) => {
  // searchResult is a SearchResult object
});
```

```java
JSONObject filter = new JSONObject();

kuzzle
  .collection("collection", "index")
  .search(filter, new ResponseListener<SearchResult>() {
    @Override
    public void onSuccess(SearchResult searchResult) {
      for (Document doc : result.getDocuments()) {
        // fetched documents
      }

      result.getTotal(); // returns the total number of documents returnable

      result.getAggregations(): // returns a JSONObject representing the aggregations response
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


$filters = (object) [];

$kuzzle = new Kuzzle('localhost');
$dataCollection = $kuzzle->collection('collection', 'index');

try {
  $searchResult = $dataCollection->search($filters);

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

This object is the result of a [search]({{ site_base_path }}sdk-reference/collection/search) or a [scroll]({{ site_base_path }}sdk-reference/collection/scroll) request, allowing to manipulate the result and do subsequent requests.

---

## SearchResult(collection, total, documents, aggregations, options, filters, [previous])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``collection`` | Collection | An instantiated [Collection]({{ site_base_path }}sdk-reference/collection) object |
| ``total`` | integer | The total number of results of the search/scroll request |
| ``documents`` | Document[] | An array of instantiated [Document]({{ site_base_path }}sdk-reference/document) objects |
| ``aggregations`` | object | The result of an aggregation produced by a search request |
| ``options`` | object | The arguments of the search/scroll request |
| ``filters`` | object | The filters of the search request |
| ``previous`` | SearchRequest | The previous SearchResult produced by a previous search/scroll request (see [fetchNext]({{ site_base_path }}sdk-reference/search-result/fetch-next)) |

**Note:** this constructor is meant to be called internally when retrieving results from a search or a scroll request.

---

## Properties

| Property name | Type | Description | get/set |
|--------------|--------|-----------------------------------|---------|
| ``aggregations`` | object | The result of an aggregation produced by a search request | get |
| ``collection`` | Collection | The data collection associated to this document | get |
| ``documents`` | Document[] | An array of instantiated Document objects | get |
| ``fetchedDocument`` | number | Represents the offset of the last document in the current SearchResult set | get/set |
| ``options`` | object | The arguments of the search/scroll request | get |
| ``filters`` | object | The filters of the search request | get |
| ``total`` | integer | The total number of results of the search/scroll request | get |

---

## Getters

| Getter name | Type | Description |
|-------------|------|--------------------------------------------|
| ``getAggregations()`` | object | Returns the `aggregation` property value |
| ``getCollection()`` | Collection | Returns the `collection` property value |
| ``getDocuments()`` | Document[] | Returns the `documents` property value |
| ``getFetchedDocument()`` | number | Returns the `fetchedDocument` property value |
| ``getOptions()`` | object | Returns the `options` property value |
| ``getFilters()`` | object | Returns the `filters` property value |
| ``getTotal()`` | integer | Returns the `total` property value |
