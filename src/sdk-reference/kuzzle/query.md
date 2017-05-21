---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: query
---

## query

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.query({controller: 'document', action: 'search'}, {match: { message: 'this is a test' }}, function (err, res) {
  // ...
});

// Using promises (NodeJS only)
kuzzle
  .queryPromise({controller: 'document', action: 'search'}, {match: { message: 'this is a test' }})
  .then(result => {

  });
```

```java
QueryArgs args = new QueryArgs();
args.controller = "document";
args.action = "search";
kuzzle.query(args, new JSONObject(), new OnQueryDoneListener() {
  @Override
  public void onSuccess(JSONObject object) {

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

$queryArgs = [
  'controller' => 'document',
  'action' => 'search'
];

$query = [
  'filter' => [
    'equals' => ['field' => 'value']
  ]
];

try {
  $response = $kuzzle->query($queryArgs, $query);
  // var_dump($response['result']['hits']);
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
{ "error": null,
  "result": {
    "_shards": {
      "failed": 0,
      "successful": 5,
      "total": 5
    },
    "_source": {},
    "action": "search",
    "collection": "foo",
    "controller": "document",
    "hits": {
      "hits": [],
      "max_score": 0,
      "total": 0
    },
    "requestId": "bf87b930-7c02-11e5-ab10-dfa9e9fd2e07",
    "timed_out": false,
    "took": 1
  }
}
```

Base method used to send queries to Kuzzle, following the [API Documentation]({{ site_base_path }}api-documentation)

<aside class="warning">
This is a low-level method, exposed to allow advanced SDK users to bypass high-level methods.<br/>
Check the Kuzzle API Reference available <a href="{{ site_base_path }}api-documentation">here</a>
</aside>

---

## query(queryArgs, query, [options], [callback])

| Argument | Type | Description |
|---------------|---------|----------------------------------------|
| ``queryArgs`` | JSON object | Query base arguments |
| ``query`` | JSON object | Query to execute |
| ``options`` | JSON object | Optional parameters |
| ``callback`` | function | Optional callback |

---

## queryArgs

`queryArgs` is a JSON object with the following properties:

| Option | Type | Description |  Required? |
|---------------|---------|----------------------------------------|---------|
| ``controller`` | string | API Controller argument | required |
| ``action`` | string | API Controller action | required |
| ``index`` | string | Index concerned by the action | optional |
| ``collection`` | string | Data collection concerned by the action | optional |

---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``volatile`` | JSON object | Additional information passed to notifications to other users | ``null`` |
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

---

## Return value

Returns the `Kuzzle` object to allow chaining.

---

## Callback response

Resolves to a `JSON object` containing the raw Kuzzle response.
