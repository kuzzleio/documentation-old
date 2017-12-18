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
 This class can only be instantiated internally by this SDK, 
 either as a result of a document search API call, a result
 of a scroll API call, or by requesting the next result page
 using this class "fetchNext" exposed method
 */
```

```java
/* 
 This class can only be instantiated internally by this SDK, 
 either as a result of a document search API call, a result
 of a scroll API call, or by requesting the next result page
 using this class "fetchNext" exposed method
 */
```

```php
/* 
 This class can only be instantiated internally by this SDK, 
 either as a result of a document search API call, a result
 of a scroll API call, or by requesting the next result page
 using this class "fetchNext" exposed method
 */
```

This object is the result of a [search]({{ site_base_path }}sdk-reference/collection/search) or a [scroll]({{ site_base_path }}sdk-reference/collection/scroll) request, allowing to manipulate the result and do subsequent requests.

---

## Properties

| Property name | Type | Description | get/set |
|--------------|--------|-----------------------------------|---------|
| ``aggregations`` | object | The result of an aggregation produced by a search request | get |
| ``collection`` | Collection | The data collection associated to this document | get |
| ``documents`` | Document[] | An array of instantiated Document objects | get |
| ``fetched`` | number | The number of fetched documents so far | get/set |
| ``options`` | object | The arguments of the search/scroll request | get |
| ``filters`` | object | The filters of the search request | get |
| ``total`` | integer | The total number of results that can be fetched | get |

---
