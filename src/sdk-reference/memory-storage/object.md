---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: object
---

# object

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle.memoryStorage.object('key', 'encoding', function (err, property) {
  // callback called once the action has completed
});

// Using promises (NodeJS only)
kuzzle.memoryStorage.objectPromise('key', 'encoding')
  .then(property => {
    // resolved once the action has completed
  });
```

```java
kuzzle.memoryStorage.object("key", "encoding", new ResponseListener<String>() {
  @Override
  public void onSuccess(String property) {
    // callback called once the action has completed
  }

  @Override
  public void onError(JSONObject error) {
  }
});
```

```php
<?php

use \Kuzzle\Kuzzle;


$kuzzle = new Kuzzle('localhost');

try {
  $property = $kuzzle->memoryStorage()->object('key', 'encoding');
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
"raw"
```

Inspects the low-level properties of a key.

[[_Redis documentation_]](https://redis.io/commands/object)

---

## object(key, subcommand, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `key` | string | Key identifier |
| `subcommand` | string | Name of the low-level property to inspect.<br/>Allowed values: `refcount`, `encoding`, `idletime` |
| `options` | JSON Object | Optional parameters |
| `callback` | function | Callback |


---

## Options

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| `queuable` | boolean | Mark this request as (not) queuable | `true` |


---

## Callback response

Resolves to the value of the inspected property.
