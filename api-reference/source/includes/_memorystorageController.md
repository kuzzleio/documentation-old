# ~ memoryStorage controller

Kuzzle's memory storage is a data store separated from the database layer.
It is internally based on Redis. You can access most of Redis functions (all lowercased), except functions falling in the following categories:

* blocking functions
* cluster commands
* configuration commands
* cursor functions
* database administration commands
* debugging functions
* script based functions
* transaction functions


The in-memory database accessible by this controller is separated from the space reserved by Kuzzle. No action of this controller can affect Kuzzle's behavior.

## append

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_append/<key>`<br/>
**Method:** `POST`<br/>
**Body:**

<section class="http"></section>

```litcoffee
{
  "value": "value to be appended to the key"
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "append",
  "_id": "<key>"
  "body": {
    "value": "value to be appended to the key"
  }
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "append",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": <new value length after the append operation>
}
```

Appends a value to a key. If the key does not exist, it is created.

[[_Redis documentation_]](https://redis.io/commands/append)

## bitcount

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_bitcount/<key>[?start=<integer>&end=<integer>]`  
>**Method:** `GET`  

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "bitcount",
  "_id": "<key>",
  "start": <integer>,
  "end": <integer>
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "bitcount",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": <count>
}
```

Counts the number of set bits (population counting) in a string.  
The `start` and `end` parameters are optional.

[[_Redis documentation_]](https://redis.io/commands/bitcount)

## bitop

<section class="http"></section>

>**URL:** `http://kuzzle:7512//ms/_bitop/<destination key>`  
>**Method:** `POST`  
>**Body:**  

<section class="http"></section>

```litcoffee
{
  "operation": "[AND|OR|XOR|NOT]",
  "keys": ["srckey1", "srckey2", "..."]
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "bitop",
  "_id": "destination key",
  "body": {
    "operation": "[AND|OR|XOR|NOT]",
    "keys": ["srckey1", "srckey2", "..."]
  }
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "bitop",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": <new destination key length>
}
```

Performs a bitwise operation between multiple keys (containing string values) and stores the result in the destination key.

[[_Redis documentation_]](https://redis.io/commands/bitop)

## bitpos

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_bitpos/<key>?bit=[0|1][&start=<integer>&end=<integer>]`  
>**Method:** `GET`  

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "bitpos",
  "_id": "<key>",
  "bit": [0|1],
  "start": <integer>,
  "end": <integer>
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "bitpos",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": <bit 1st position (integer)>
}
```

Returns the position of the first bit set to 1 or 0 in a string, or in a substring.

[[_Redis documentation_]](https://redis.io/commands/bitpos)

## dbsize

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_dbsize`  
>**Method:** `GET`  


<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "dbsize",
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "dbsize",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": <number of keys>
}
```

Returns the number of keys in the application database.

[[_Redis documentation_]](https://redis.io/commands/dbsize)

## decr

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_decr/<key>`  
>**Method:** `POST`  

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "decr",
  "_id": "<key>"
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "decr",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": <updated key value>
}
```

Decrements the number stored at `key` by 1. If the key does not exist, it is set to 0 before performing the operation.

[[_Redis documentation_]](https://redis.io/commands/decr)

## decrby

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_decrby/<key>`  
>**Method:** `POST`  
>**Body:**  

<section class="http"></section>

```litcoffee
{
  "value": <decrement value>
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "decrby",
  "_id": "<key>",
  "body": {
    "value": <decrement value>
  }
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "decrby",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": <updated key value>
}
```

Decrements the number stored at `key` by a provided integer value. If the key does not exist, it is set to 0 before performing the operation.

[[_Redis documentation_]](https://redis.io/commands/decrby)

## del

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms`  
>**Method:** `DELETE`  
>**Body:**  

<section class="http"></section>

```litcoffee
{
  "keys": ["key1", "key2", "..."]
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "del",
  "body": {
    "keys": ["key1", "key2", "..."]
  }
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "del",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": <number of deleted keys>
}
```

Deletes a list of keys.

[[_Redis documentation_]](https://redis.io/commands/del)

## exists

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_exists?keys=key1,key2,...`  
>**Method:** `GET`  

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "exists",
  "keys": ["key1", "key2", "..."]
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "exists",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": <number of existing keys>
}
```

Checks if the specified keys exist in the database.

[[_Redis documentation_]](https://redis.io/commands/exists)

## expire

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_expire/<key>`  
>**Method:** `POST`  
>**Body:**

<section class="http"></section>

```litcoffee
{
  "seconds": <time to live>
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "expire",
  "_id": "<key>",
  "body": {
    "seconds": <time to live>
  }
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "expire",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": <0|1 - success status>
}
```

Sets a timeout (in seconds) on a key.  After the timeout has expired, the key will automatically be deleted.

[[_Redis documentation_]](https://redis.io/commands/expire)

## expireat

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_expireat/<key>`  
>**Method:** `POST`  
>**Body:**

<section class="http"></section>

```litcoffee
{
  "timestamp": <Epoch time>
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "expireat",
  "_id": "<key>",
  "body": {
    "timestamp": <Epoch time>
  }
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "expireat",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": <0|1 - success status>
}
```

Sets an expiration timestamp on a key. After the timestamp has been reached, the key will automatically be deleted.  
The `timestamp` parameter accepts an [Epoch time](https://en.wikipedia.org/wiki/Unix_time) value.

[[_Redis documentation_]](https://redis.io/commands/expireat)

## flushdb

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_flushdb`  
>**Method:** `POST`  

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "flushdb"
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "flushdb",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": 1
}
```

Deletes all the keys of the database dedicated to client applications (the reserved space for Kuzzle is unaffected).

[[_Redis documentation_]](https://redis.io/commands/flushdb)

## geoadd

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_geoadd/<key>`  
>**Method:** `POST`  
**Body:**

<section class="http"></section>

```litcoffee
{
  "points": [
    {
      "lon": <float between -180 and 180>,
      "lat": <float between -85.05112878 and 85.05112878>,
      "name": "point name"
    },
    {
      "lon": <float between -180 and 180>,
      "lat": <float between -85.05112878 and 85.05112878>,
      "name": "point name"
    },
    ...
  ]
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "geoadd",
  "_id": "<key>",
  "body": {
    "points": [
      {
        "lon": <float between -180 and 180>,
        "lat": <float between -85.05112878 and 85.05112878>,
        "name": "point name"
      },
      {
        "lon": <float between -180 and 180>,
        "lat": <float between -85.05112878 and 85.05112878>,
        "name": "point name"
      },
      ...
    ]
  }
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "geoadd",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": <number of points added>
}
```

Adds geospatial points to the specified key.

[[_Redis documentation_]](https://redis.io/commands/geoadd)

## geodist

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_geodist/<key>/<member1>/<member2>[?unit=[m|km|mi|ft]]`  
>**Method:** `GET`  

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "geodist",
  "_id": "<key>",
  "member1": "first member name",
  "member2": "second member name",
  "unit": "(optional)[m|km|mi|ft]"
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "geodist",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": <calculated distance>
}
```

Returns the distance between two geospatial members of a key (see [geoadd](#geoadd)).  
The returned distance is expressed in meters by default.

[[_Redis documentation_]](https://redis.io/commands/geodist)

## geohash

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_geohash/<key>?members=member1,member2,...`  
>**Method:** `GET`  

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "geohash",
  "_id": "<key>",
  "members": ["member1", "member2", "..."]
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "geohash",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": ["geohash1", "geohash2", "..."]
}
```

Returns a valid [geohash](https://en.wikipedia.org/wiki/Geohash) for the provided key's members (see [geoadd](#geoadd)).  

[[_Redis documentation_]](https://redis.io/commands/geohash)

## geopos

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_geopos/<key>?members=member1,member2,...`  
>**Method:** `GET`  


<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "geopos",
  "_id": "<key>",
  "members": ["member1", "member2", "..."]
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "geopos",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": [
    [<longitude of member1>, <latitude of member1>],
    [<longitude of member2>, <latitude of member2>],
    [<longitude of ...>, <latitude of ...>]
  ]
}
```

Returns the positions (longitude, latitude) of the provided key's members (see [geoadd](#geoadd)).  

[[_Redis documentation_]](https://redis.io/commands/geopos)

## georadius

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_georadius/<key>?lon=<longitude>&lat=<latitude>&distance=<distance>&unit=[m|km|mi|ft][&options=option1,option2,...]`  
>**Method:** `GET`  


<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "georadius",
  "_id": "<key>",
  "lon": <longitude>,
  "lat": <latitude>,
  "distance": <distance>,
  "unit": "[m|km|mi|ft]",
  "options": ["(optional)", "option1", "option2", "..."]
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "georadius",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": [
    "member1",
    "member2",
    "..."
  ]
}
```

Returns the members (added with [geoadd](#geoadd)) of a given key inside the provided geospatial radius.

The `options` parameter accepts the following options: `withcoord`, `withdist`, `count <count>`, `asc` and `desc`.  
The provided count value for the `count` option must be passed as a separate option.  
For instance, `&options=count,<count>` for HTTP requests, or `options: ['count', <count>]` for other protocols.

The `result` format may change if `options` parameters are provided: instead of an array of value, the result may instead be an array of arrays (for instance with `withdist` or `withcoord` options).

[[_Redis documentation_]](https://redis.io/commands/georadius)

## georadiusbymember

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_georadiusbymember/<key>?member=<member>&distance=<distance>&unit=[m|km|mi|ft][&options=option1,option2,...]`  
>**Method:** `GET`  

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "georadiusbymember",
  "_id": "<key>",
  "member": "<member>",
  "distance": <distance>,
  "unit": "[m|km|mi|ft]",
  "options": ["(optional)", "option1", "option2", "..."]
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "georadiusbymember",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": [
    "member1",
    "member2",
    "..."
  ]
}
```

Returns the members (added with [geoadd](#geoadd)) of a given key inside the provided geospatial radius, centered around one of a key's member.

The `options` parameter accepts the following options: `withcoord`, `withdist`, `count <count>`, `asc` and `desc`.  
The provided count value for the `count` option must be passed as a separate option.  
For instance, `&options=count,<count>` for HTTP requests, or `options: ['count', <count>]` for other protocols.

The `result` format may change if `options` parameters are provided: instead of an array of value, the result may instead be an array of arrays (for instance with `withdist` or `withcoord` options).

[[_Redis documentation_]](https://redis.io/commands/georadiusbymember)

## get

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/<key>`  
>**Method:** `GET`    

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "get",
  "_id": "<key>"
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "get",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": "value"
}
```

Returns the value of a key, or `null` if the key doesn't exist.

[[_Redis documentation_]](https://redis.io/commands/get)

## getbit

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_getbit/<key>?offset=<offset>`  
>**Method:** `GET`    

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "getbit",
  "_id": "<key>",
  "offset": <offset>
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "getbit",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": [0|1]
}
```

Returns the bit value at `offset`, in the string value stored in a key.

[[_Redis documentation_]](https://redis.io/commands/getbit)

## getrange

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_getrange/<key>?start=<start>&end=<end>`  
>**Method:** `GET`  

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "getrange",
  "_id": "<key>",
  "start": <start position>,
  "end": <end position>
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "getrange",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": "<value substring>"
}
```

Returns a substring of a key's value.

[[_Redis documentation_]](https://redis.io/commands/getrange)

## getset

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_getset/<key>`  
>**Method:** `POST`  
>**Body:**  

<section class="http"></section>

```litcoffee
{
  "value": "new key value"
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "getset",
  "_id": "<key>",
  "body": {
    "value": "new key value"
  }
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "getset",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": "key's previous value"
}
```

Sets a new value for a key and returns the previous stored value.

[[_Redis documentation_]](https://redis.io/commands/getset)

## hdel

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_hdel/<key>`  
>**Method:** `DELETE`  
>**Body:**  

<section class="http"></section>

```litcoffee
{
  "fields": ["field1", "field2", "..."]
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "hdel",
  "_id": "<key>",
  "body": {
    "fields": ["field1", "field2", "..."]
  }
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "hdel",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": <number of removed fields>
}
```

Removes fields from a hash.

[[_Redis documentation_]](https://redis.io/commands/hdel)

## hexists

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_hexists/<key>/<field>`  
>**Method:** `GET`  

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "hexists",
  "_id": "<key>",
  "field": "field name"
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "hexists",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": [0|1]
}
```

Checks if a field exists in a hash.

[[_Redis documentation_]](https://redis.io/commands/hexists)

## hget

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_hget/<key>/<field>`  
>**Method:** `GET`  

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "hget",
  "_id": "<key>",
  "field": "field name"
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "hget",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": "field value"
}
```

Returns the field's value of a hash.

[[_Redis documentation_]](https://redis.io/commands/hget)

## hgetall

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_hgetall/<key>`  
>**Method:** `GET`  

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "hgetall",
  "_id": "<key>"
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "hgetall",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": {
    "field1": "value",
    "field2": "value",
    "...": "..."
  }
}
```

Returns all fields and values of a hash.

[[_Redis documentation_]](https://redis.io/commands/hgetall)

## hincrby

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_hincrby/<key>`  
>**Method:** `POST`  
>**Body:**  

<section class="http"></section>

```litcoffee
{
  "field": "field name",
  "value": <increment value>
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "hincrby",
  "_id": "<key>",
  "body": {
    "field": "field name",
    "value": <increment value>
  }
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "hincrby",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": <new field value>
}
```

Increments the number stored in a hash field by the provided integer value.

[[_Redis documentation_]](https://redis.io/commands/hincrby)

## hincrbyfloat

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_hincrbyfloat/<key>`  
>**Method:** `POST`  
>**Body:**  

<section class="http"></section>

```litcoffee
{
  "field": "field name",
  "value": <increment value>
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "hincrbyfloat",
  "_id": "<key>",
  "body": {
    "field": "field name",
    "value": <increment value>
  }
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "hincrbyfloat",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": <new field value>
}
```

Increments the number stored in a hash field by the provided float value.

[[_Redis documentation_]](https://redis.io/commands/hincrbyfloat)

## hkeys

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_hkeys/<key>`  
>**Method:** `GET`  

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "hkeys",
  "_id": "<key>"
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "hkeys",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": [
    "field1",
    "field2",
    "..."
  ]
}
```

Returns all field names containined in a hash.

[[_Redis documentation_]](https://redis.io/commands/hkeys)

## hlen

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_hlen/<key>`  
>**Method:** `GET`  

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "hlen",
  "_id": "<key>"
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "hlen",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": <number of fields contained in the hash>
}
```

Returns the number of fields contained in a hash.

[[_Redis documentation_]](https://redis.io/commands/hlen)

## hmget

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_hmget/<key>?fields=field1,field2,...`  
>**Method:** `GET`  

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "hmget",
  "_id": "<key>",
  "fields": ["field1", "field2", "..."]
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "hmget",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": [
    "field1's value",
    "field2's value",
    "...'s value"
  ]
}
```

Returns the values of the specified hash's fields.

[[_Redis documentation_]](https://redis.io/commands/hmget)

## hmset

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_hmset/<key>`  
>**Method:** `POST`  
>**Body:**  

<section class="http"></section>

```litcoffee
{
  "entries": [
    {"field": "<field1 name>", "value": "<field1 value>"},
    {"field": "<field2 name>", "value": "<field2 value>"},
    {"field": "<...>", "value": "<...>"}
  ]
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "hmset",
  "_id": "<key>",
  "body": {
    "entries": [
      {"field": "<field1 name>", "value": "<field1 value>"},
      {"field": "<field2 name>", "value": "<field2 value>"},
      {"field": "<...>", "value": "<...>"}
    ]
  }
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "hmset",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": "OK"
}
```

Sets multiple fields at once in a hash.

[[_Redis documentation_]](https://redis.io/commands/hmset)

## hscan

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_hscan/<key>?cursor=<cursor>[&match=<pattern>][&count=<count>]`  
>**Method:** `GET`  

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "hscan",
  "_id": "<key>",
  "cursor": <cursor>,

  // optional
  "match": "<pattern>",
  "count": <count>
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "hscan",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": [
    <new cursor position>,
    [
      "field1",
      "value of field1",
      "field2",
      "value of field2",
      "..."
    ]
  ]
}
```

Identical to [scan](#scan), except that `hscan` iterates the fields contained in a hash.


[[_Redis documentation_]](https://redis.io/commands/hscan)

## hset

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_hset/<key>`  
>**Method:** `POST`  
>**Body:**  

<section class="http"></section>

```litcoffee
{
  "field": "<field name>",
  "value": "<field value>"
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "hset",
  "_id": "<key>",
  "body": {
    "field": "<field name>",
    "value": "<field value>"
  }
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "hset",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": [0|1]
}
```

Sets a field and its value in a hash. If the key does not exist, a new key holding a hash is created. If the field already exists, its value is overwritten.

[[_Redis documentation_]](https://redis.io/commands/hset)

## hsetnx

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_hsetnx/<key>`  
>**Method:** `POST`  
>**Body:**  

<section class="http"></section>

```litcoffee
{
  "field": "<field name>",
  "value": "<field value>"
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "hsetnx",
  "_id": "<key>",
  "body": {
    "field": "<field name>",
    "value": "<field value>"
  }
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "hsetnx",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": [0|1]
}
```

Sets a field and its value in a hash, only if the field does not already exist.

[[_Redis documentation_]](https://redis.io/commands/hsetnx)

## hstrlen

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_hstrlen/<key>/<field>`  
>**Method:** `GET`  

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "hstrlen",
  "_id": "<key>",
  "field": "<field>"
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "hstrlen",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": <value string length>
}
```

Returns the string length of a field's value in a hash.

[[_Redis documentation_]](https://redis.io/commands/hstrlen)

## hvals

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_hvals/<key>`  
>**Method:** `GET`  

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "hvals",
  "_id": "<key>"
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "hvals",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": [
    "<value of field1>",
    "<value of field2>",
    "..."
  ]
}
```

Returns all values contained in a hash.

[[_Redis documentation_]](https://redis.io/commands/hvals)

## incr

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_incr/<key>`  
>**Method:** `POST`  

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "incr",
  "_id": "<key>"
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "incr",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": <updated key value>
}
```

Increments the number stored at `key` by 1. If the key does not exist, it is set to 0 before performing the operation.

[[_Redis documentation_]](https://redis.io/commands/incr)

## incrby

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_incrby/<key>`  
>**Method:** `POST`  
>**Body:**  

<section class="http"></section>

```litcoffee
{
  "value": <increment value>
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "incrby",
  "_id": "<key>",
  "body": {
    "value": <increment value>
  }
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "incrby",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": <updated key value>
}
```

Increments the number stored at `key` by the provided integer value. If the key does not exist, it is set to 0 before performing the operation.

[[_Redis documentation_]](https://redis.io/commands/incrby)

## incrbyfloat

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_incrbyfloat/<key>`  
>**Method:** `POST`  
>**Body:**  

<section class="http"></section>

```litcoffee
{
  "value": <increment value>
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "incrbyfloat",
  "_id": "<key>",
  "body": {
    "value": <increment value>
  }
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "incrbyfloat",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": <updated key value>
}
```

Increments the number stored at `key` by the provided float value. If the key does not exist, it is set to 0 before performing the operation.

[[_Redis documentation_]](https://redis.io/commands/incrbyfloat)

## keys

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_keys/<pattern>`  
>**Method:** `GET`  

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "keys",
  "pattern": "<pattern>"
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "keys",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": [
    "key1",
    "key2",
    "..."
  ]
}
```

Returns all keys matching the provided pattern.

[[_Redis documentation_]](https://redis.io/commands/keys)

## lindex

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_lindex/<key>/<index>`  
>**Method:** `GET`  

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "lindex",
  "_id": "<key>",
  "idx": "<index>"
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "lindex",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": "<value>"
}
```

Returns the element at the provided index in a list.

[[_Redis documentation_]](https://redis.io/commands/lindex)

## linsert

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_linsert/<key>`  
>**Method:** `POST`  
>**Body:**  

<section class="http"></section>

```litcoffee
{
  "position": "[before|after]",
  "pivot": "<pivot value>",
  "value": "<value to insert>"
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "linsert",
  "_id": "<key>",
  "body": {
    "position": "[before|after]",
    "pivot": "<pivot value>",
    "value": "<value to insert>"
  }
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "linsert",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": <updated number of items in the list>
}
```

Inserts a value in a list, either before or after the reference pivot value.

[[_Redis documentation_]](https://redis.io/commands/linsert)

## llen

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_llen/<key>`  
>**Method:** `GET`  

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "llen",
  "_id": "<key>"
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "llen",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": <length of the list>
}
```

Returns the length of a list.

[[_Redis documentation_]](https://redis.io/commands/llen)

## lpop

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_lpop/<key>`  
>**Method:** `POST`  

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "lpop",
  "_id": "<key>"
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "lpop",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": "<removed value>"
}
```

Removes and returns the first element of a list.

[[_Redis documentation_]](https://redis.io/commands/lpop)

## lpush

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_lpush/<key>`  
>**Method:** `POST`  
>**Body:**  

<section class="http"></section>

```litcoffee
{
  "values": ["value1", "value2", "..."]
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "lpush",
  "_id": "<key>",
  "body": {
    "values": ["value1", "value2", "..."]
  }
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "lpush",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": <updated number of elements in the list>
}
```

Prepends the specified values to a list. If the key does not exist, it is created holding an empty list before performing the operation.

[[_Redis documentation_]](https://redis.io/commands/lpush)

## lpushx

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_lpushx/<key>`  
>**Method:** `POST`  
>**Body:**  

<section class="http"></section>

```litcoffee
{
  "value": "<value>"
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "lpushx",
  "_id": "<key>",
  "body": {
    "value": "<value>"
  }
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "lpushx",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": <updated number of elements in the list>
}
```

Prepends the specified value to a list, only if the key already exists and if it holds a list.

[[_Redis documentation_]](https://redis.io/commands/lpushx)

## lrange

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_lrange/<key>?start=<start>&stop=<stop>`  
>**Method:** `GET`  

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "lrange",
  "_id": "<key>",
  "start": <start>,
  "stop": <stop>
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "lrange",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": [
    "value1",
    "value2",
    "..."
  ]
}
```

Returns the list elements between the `start` and `stop` positions.

[[_Redis documentation_]](https://redis.io/commands/lrange)

## lrem

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_lrem/<key>`  
>**Method:** `DELETE`  
>**Body:**  

<section class="http"></section>

```litcoffee
{
  "count": <count>,
  "value": "<value to remove>"
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "lrem",
  "_id": "<key>",
  "body": {
    "count": <count>,
    "value": "<value to remove>"
  }
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "lrem",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": <number of removed elements>
}
```

Removes the first `count` occurences of elements equal to `value` from a list.

[[_Redis documentation_]](https://redis.io/commands/lrem)

## lset

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_lset/<key>`  
>**Method:** `POST`  
>**Body:**  

<section class="http"></section>

```litcoffee
{
  "index": <index>,
  "value": "<value>"
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "lset",
  "_id": "<key>",
  "body": {
    "index": <index>,
    "value": "<value>"
  }
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "lset",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": "OK"
}
```

Sets the list element at `index` with the provided value.

[[_Redis documentation_]](https://redis.io/commands/lset)

## ltrim

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_ltrim/<key>`  
>**Method:** `POST`  
>**Body:**  

<section class="http"></section>

```litcoffee
{
  "start": <start>,
  "stop": <stop>
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "ltrim",
  "_id": "<key>",
  "body": {
    "start": <start>,
    "stop": <stop>
  }
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "ltrim",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": "OK"
}
```

Trims an existing list so that it will contain only the specified range of elements specified.

[[_Redis documentation_]](https://redis.io/commands/ltrim)

## mget (memoryStorage)

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_mget?keys=key1,key2,...`  
>**Method:** `GET`  


<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "mget",
  "keys": ["key1", "key2", "..."]
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "mget",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": [
    "value of key1",
    "value of key2",
    "..."
  ]
}
```

Returns the values of the provided keys.

[[_Redis documentation_]](https://redis.io/commands/mget)

## mset

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_mset`  
>**Method:** `POST`  
>**Body:**  

<section class="http"></section>

```litcoffee
{
  "entries": [
    {"key": "<key1>", "value": "<value1>"},
    {"key": "<key2>", "value": "<value2>"},
    {"key": "...", "value": "..."}
  ]
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "mset",
  "body": {
    "entries": [
      {"key": "<key1>", "value": "<value1>"},
      {"key": "<key2>", "value": "<value2>"},
      {"key": "...", "value": "..."}
    ]
  }
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "mset",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": "OK"
}
```

Sets the provided keys to their respective values. If a key does not exist, it is created. Otherwise, the key's value is overwritten.

[[_Redis documentation_]](https://redis.io/commands/mset)

## msetnx

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_msetnx`  
>**Method:** `POST`  
>**Body:**  

<section class="http"></section>

```litcoffee
{
  "entries": [
    {"key": "<key1>", "value": "<value1>"},
    {"key": "<key2>", "value": "<value2>"},
    {"key": "...", "value": "..."}
  ]
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "msetnx",
  "body": {
    "entries": [
      {"key": "<key1>", "value": "<value1>"},
      {"key": "<key2>", "value": "<value2>"},
      {"key": "...", "value": "..."}
    ]
  }
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "msetnx",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": [0|1]
}
```

Sets the provided keys to their respective values, only if they do not exist. If a key exists, then the whole operation is aborted and no key is set.

[[_Redis documentation_]](https://redis.io/commands/msetnx)

## object

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_object/<key>?subcommand=[refcount|encoding|idletime]`  
>**Method:** `GET`  

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "object",
  "_id": "<key>",
  "subcommand": "[refcount|encoding|idletime]"
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "object",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": <object inspection result>
}
```

Inspects the low-level properties of a key.

[[_Redis documentation_]](https://redis.io/commands/object)

## persist

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_persist/<key>`  
>**Method:** `POST`  


<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "persist",
  "_id": "<key>"
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "persist",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": [0|1]
}
```

Removes the expiration delay or timestamp from a key, making it persistent.

[[_Redis documentation_]](https://redis.io/commands/persist)

## pexpire

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_pexpire/<key>`  
>**Method:** `POST`  
>**Body:**  

<section class="http"></section>

```litcoffee
{
  "milliseconds": <time to live>
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "pexpire",
  "_id": "<key>",
  "body": {
    "milliseconds": <time to live>
  }
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "pexpire",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": [0|1]
}
```

Sets a timeout (in milliseconds) on a key. After the timeout has expired, the key will automatically be deleted.

[[_Redis documentation_]](https://redis.io/commands/pexpire)

## pexpireat

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_pexpireat/<key>`  
>**Method:** `POST`  
>**Body:**

<section class="http"></section>

```litcoffee
{
  "timestamp": <Epoch time in milliseconds>
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "pexpireat",
  "_id": "<key>",
  "body": {
    "timestamp": <Epoch time in milliseconds>
  }
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "pexpireat",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": [0|1]
}
```

Sets an expiration timestamp on a key. After the timestamp has been reached, the key will automatically be deleted.  
The `timestamp` parameter accepts an [Epoch time](https://en.wikipedia.org/wiki/Unix_time) value, in milliseconds.

[[_Redis documentation_]](https://redis.io/commands/pexpireat)

## pfadd

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_pfadd/<key>`  
>**Method:** `POST`  
>**Body:**  

<section class="http"></section>

```litcoffee
{
  "elements": ["element1", "element2", "..."]
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "pfadd",
  "_id": "<key>",
  "body": {
    "elements": ["element1", "element2", "..."]
  }
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "pfadd",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": [0|1]
}
```

Adds elements to an [HyperLogLog](https://en.wikipedia.org/wiki/HyperLogLog) data structure.

[[_Redis documentation_]](https://redis.io/commands/pfadd)

## pfcount

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_pfcount?keys=key1,key2,...`  
>**Method:** `GET`  

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "pfcount",
  "keys": ["key1", "key2", "..."]
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "pfcount",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": <probabilistic cardinality>
}
```

Returns the probabilistic cardinality of a [HyperLogLog](https://en.wikipedia.org/wiki/HyperLogLog) data structure, or of the merged HyperLogLog structures if more than 1 is provided (see [pfadd](#pfadd)).

[[_Redis documentation_]](https://redis.io/commands/pfcount)

## pfmerge

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_pfmerge/<key>`  
>**Method:** `POST`  
>**Body:**  

<section class="http"></section>

```litcoffee
{
  "sources": ["key1", "key2", "..."]
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "pfmerge",
  "_id": "<key>",
  "body": {
    "sources": ["key1", "key2", "..."]
  }
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "pfmerge",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": "OK"
}
```

Merges multiple [HyperLogLog](https://en.wikipedia.org/wiki/HyperLogLog) data structures into an unique HyperLogLog structure stored at `key`, approximating the cardinality of the union of the source structures.

[[_Redis documentation_]](https://redis.io/commands/pfmerge)

## ping

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_ping`  
>**Method:** `GET`  

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "ping"
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "ping",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": "PONG"
}
```

Pings the memory storage database.

[[_Redis documentation_]](https://redis.io/commands/ping)

## psetex

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_psetex/<key>`  
>**Method:** `POST`  
>**Body:**  

<section class="http"></section>

```litcoffee
{
  "milliseconds": <time to live>,
  "value": "<value to set>"
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "psetex",
  "_id": "<key>",
  "body": {
    "milliseconds": <time to live>,
    "value": "<value to set>"
  }
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "psetex",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": "OK"
}
```

Sets a key with the provided value, and an expiration delay expressed in milliseconds. If the key does not exist, it is created beforehand.

[[_Redis documentation_]](https://redis.io/commands/psetex)

## pttl

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_pttl/<key>`  
>**Method:** `GET`  

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "pttl",
  "_id": "<key>"
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "pttl",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": <remaining time to live, in milliseconds>
}
```

Returns the remaining time to live of a key, in milliseconds.

[[_Redis documentation_]](https://redis.io/commands/pttl)

## randomkey

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_randomkey`  
>**Method:** `GET`  
>**Body:**  


<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "randomkey"
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "randomkey",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": "<one of the database's key, at random>"
}
```

Returns a random key from the memory storage.

[[_Redis documentation_]](https://redis.io/commands/randomkey)

## rename

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_rename/<key>`  
>**Method:** `POST`  
>**Body:**  

<section class="http"></section>

```litcoffee
{
  "newkey": "<new key name>"
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "rename",
  "_id": "<key>",
  "body": {
    "newkey": "<new key name>"
  }
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "rename",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": "OK"
}
```

Renames a key to `newkey`. If `newkey` already exists, it is overwritten.

[[_Redis documentation_]](https://redis.io/commands/rename)

## renamenx

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_renamenx/<key>`  
>**Method:** `POST`  
>**Body:**  

<section class="http"></section>

```litcoffee
{
  "newkey": "<new key name>"
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "renamenx",
  "_id": "<key>",
  "body": {
    "newkey": "<new key name>"
  }
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "renamenx",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": "OK"
}
```

Renames a key to `newkey`, only if `newkey` does not already exist.

[[_Redis documentation_]](https://redis.io/commands/renamenx)

## rpop

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_rpop/<key>`  
>**Method:** `POST`  

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "rpop",
  "_id": "<key>"
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "rpop",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": "<removed element value>"
}
```

Removes the last element of a list and returns it.

[[_Redis documentation_]](https://redis.io/commands/rpop)

## rpoplpush

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_rpoplpush`  
>**Method:** `POST`  
>**Body:**  

<section class="http"></section>

```litcoffee
{
  "source": "<key>",
  "destination": "<key>"
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "rpoplpush",
  "body": {
    "source": "<key>",
    "destination": "<key>"
  }
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "rpoplpush",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": "<popped/pushed element>"
}
```

Removes the last element of the list at `source` and pushes it back at the start of the list at `destination`.

[[_Redis documentation_]](https://redis.io/commands/rpoplpush)

## rpush

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_rpush/<key>`  
>**Method:** `POST`  
>**Body:**  

<section class="http"></section>

```litcoffee
{
  "values": ["value1", "value2", "..."]
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "rpush",
  "_id": "<key>",
  "body": {
    "values": ["value1", "value2", "..."]
  }
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "rpush",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": <updated number of elements in the list>
}
```

Appends the specified values at the end of a list. If the key does not exist, it is created holding an empty list before performing the operation.

[[_Redis documentation_]](https://redis.io/commands/rpush)

## rpushx

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_rpushx/<key>`  
>**Method:** `POST`  
>**Body:**  

<section class="http"></section>

```litcoffee
{
  "value": "<value>"
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "rpushx",
  "_id": "<key>",
  "body": {
    "value": "<value>"
  }
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "rpushx",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": <updated number of elements in the list>
}
```

Appends the specified value at the end of a list, only if the key already exists and if it holds a list.

[[_Redis documentation_]](https://redis.io/commands/rpushx)

## sadd

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_sadd/<key>`  
>**Method:** `POST`  
>**Body:**  

<section class="http"></section>

```litcoffee
{
  "members": ["member1", "member2", "..."]
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "sadd",
  "_id": "<key>",
  "body": {
    "members": ["member1", "member2", "..."]
  }
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "sadd",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": <number of elements added to the set>
}
```

Adds members to a set of unique values stored at `key`. If the `key` does not exist, it is created beforehand.

[[_Redis documentation_]](https://redis.io/commands/sadd)

## scan

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_scan?cursor=<cursor>[&match=<pattern>][&count=<count>]`  
>**Method:** `GET`  

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "scan",
  "cursor": <cursor>,

  // optional
  "match": "<pattern>",
  "count": <count>
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "scan",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": [
    <new cursor position>,
    [
      "key1",
      "key2",
      "..."
    ]
  ]
}
```

Iterates incrementally the set of keys in the database using a cursor.

An iteration starts when the cursor is set to 0.  
To get the next page of results, simply re-send the request with the updated cursor position provided in the result set.  
The scan terminates when the cursor returned by the server is 0.

Optional arguments:

* `count`: return an _approximate_ number of items per result set (the default is 10)
* `match`: search only keys matching the provided pattern


[[_Redis documentation_]](https://redis.io/commands/scan)

## scard

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_scard/<key>`  
>**Method:** `GET`  

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "scard",
  "_id": "<key>"
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "scard",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": <number of members of the set>
}
```

Returns the number of members stored in a set of unique values.

[[_Redis documentation_]](https://redis.io/commands/scard)

## sdiff

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_sdiff/<key>?keys=key1,key2,...`  
>**Method:** `GET`  

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "sdiff",
  "_id": "<key>",
  "keys": ["key1", "key2", "..."]
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "sdiff",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": [
    "diff value1",
    "diff value2",
    "..."
  ]
}
```

Returns the difference between the set of unique values stored at `key` and the other provided sets.

[[_Redis documentation_]](https://redis.io/commands/sdiff)

## sdiffstore

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_sdiffstore/<key>`  
>**Method:** `POST`  
>**Body:**  

<section class="http"></section>

```litcoffee
{
  "destination": "<key>",
  "keys": ["key1", "key2", "..."]
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "sdiffstore",
  "_id": "<key>",
  "body": {
    "destination": "<key>",
    "keys": ["key1", "key2", "..."]
  }
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "sdiffstore",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": <number of elements stored in the resulting set>
}
```

Computes the difference between the set of unique values stored at `key` and the other provided sets, and stores the result in the key stored at `destination`.

If the destination key already exists, it is overwritten.

[[_Redis documentation_]](https://redis.io/commands/sdiffstore)

## set

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_set/<key>`  
>**Method:** `POST`  
>**Body:**  

<section class="http"></section>

```litcoffee
{
  "value": "<value>",

  // the following arguments are all optional
  "ex": <seconds>,
  "px": <milliseconds>,
  "nx": [false|true],
  "xx": [false|true]
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "set",
  "_id": "<key>",
  "body": {
    "value": "<value>",

    // the following arguments are all optional
    "ex": <seconds>,
    "px": <milliseconds>,
    "nx": [false|true],
    "xx": [false|true]
  }
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "set",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": "OK"
}
```

Creates a key holding the provided value, or overwrites it if it already exists.

Additional options can be provided:

* `ex`: set the specified expire time, in seconds
* `px`: set the specified expire time, in milliseconds
* `nx`: only set the key if it does not already exist
* `xx`: only set the key if it already exists

**Note:** setting `ex` and `px` options lead to a `BadRequestError` as these options are mutually exclusive. Same thing goes for `nx` and `xx`.

[[_Redis documentation_]](https://redis.io/commands/set)

## setex

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_setex/<key>`  
>**Method:** `POST`  
>**Body:**  

<section class="http"></section>

```litcoffee
{
  "value": "<value>",
  "seconds": <time to live>
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "setex",
  "_id": "<key>",
  "body": {
    "value": "<value>",
    "seconds": <time to live>
  }
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "setex",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": "OK"
}
```

Sets a value and a time to live (in seconds) on a key. If the key already exists, it is overwritten.

[[_Redis documentation_]](https://redis.io/commands/setex)

## setnx

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_setnx/<key>`  
>**Method:** `POST`  
>**Body:**  

<section class="http"></section>

```litcoffee
{
  "value": "<value>"
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "setnx",
  "_id": "<key>",
  "body": {
    "value": "<value>"
  }
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "setnx",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": [0|1]
}
```

Sets a value on a key, only if it does not already exist.

[[_Redis documentation_]](https://redis.io/commands/setnx)

## sinter

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_sinter?keys=key1,key2,...`  
>**Method:** `GET`  


<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "sinter",
  "keys": ["key1", "key2", "..."]
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "sinter",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": [
    "intersection value1",
    "intersection value2",
    "..."
  ]
}
```

Returns the intersection of the provided sets of unique values.

[[_Redis documentation_]](https://redis.io/commands/sinter)

## sinterstore

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_sinterstore`  
>**Method:** `POST`  
>**Body:**  

<section class="http"></section>

```litcoffee
{
  "destination": "<destination key>",
  "keys": ["key1", "key2", "..."]
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "sinterstore",
  "body": {
    "destination": "<destination key>",
    "keys": ["key1", "key2", "..."]
  }
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "sinterstore",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": <number of elements in the resulting set>
}
```

Computes the intersection of the provided sets of unique values and stores the result in the `destination` key.

If the destination key already exists, it is overwritten.

[[_Redis documentation_]](https://redis.io/commands/sinterstore)

## sismember

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_sismember/<key>/<member>`  
>**Method:** `GET`  

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "sismember",
  "_id": "<key>",
  "member": "<member>"
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "sismember",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": [0|1]
}
```

Checks if `member` is a member of the set of unique values stored at `key`.

[[_Redis documentation_]](https://redis.io/commands/sismember)

## smembers

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_smembers/<key>`  
>**Method:** `GET`  

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "smembers",
  "_id": "<key>"
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "smembers",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": [
    "member1",
    "member2",
    "..."
  ]
}
```

Returns the members of a set of unique values.

[[_Redis documentation_]](https://redis.io/commands/smembers)

## smove

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_smove/<key>`  
>**Method:** `POST`  
>**Body:**  

<section class="http"></section>

```litcoffee
{
  "destination": "<destination key>",
  "member": "<member>"
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "smove",
  "_id": "<key>",
  "body": {
    "destination": "<destination key>",
    "member": "<member>"
  }
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "smove",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": [0|1]
}
```

Moves a member from a set of unique values to another.

[[_Redis documentation_]](https://redis.io/commands/smove)

## sort

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_sort/<key>`  
>**Method:** `POST`  
>**Body:**  

<section class="http"></section>

```litcoffee
{
  // optional arguments
  "alpha": [false|true],
  "by": "<external key pattern>",
  "direction": "[ASC|DESC]",
  "get": ["pattern1", "pattern2", "..."],
  "limit": {
    "offset": <offset>,
    "count": <count>
  },
  "store": "<destination key>"
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "sort",
  "_id": "<key>",
  "body": {
    // optional arguments
    "alpha": [false|true],
    "by": "<external key pattern>",
    "direction": "[ASC|DESC]",
    "get": ["pattern1", "pattern2", "..."],
    "limit": {
      "offset": <offset>,
      "count": <count>
    },
    "store": "<destination key>"
  }
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "sort",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": [
    "sorted element1",
    "sorted element2",
    "..."
  ]
}
```

Sorts and returns elements contained in a list, a set of unique values or a sorted set.  
By default, sorting is numeric and elements are compared by their value interpreted as double precision floating point number.

Optional arguments may be provided:

* `alpha`: performs an alphanumerical sort instead of a numeric one
* `by`: instead of sorting by values directly, sorts by values contained in external keys, using a pattern completed by values of the list/set/sorted set to sort
* `direction`: sort in ascendant or descendant order
* `get`: instead of returning the sorted values directly, returns the values contained in external keys, using patterns completed by the sorted values
* `limit`: limits the result set to `count` elements starting from the `offset` position in the sorted result set
* `store`: instead of returning the result set, stores it in a list at `destination` key

[[_Redis documentation_]](https://redis.io/commands/sort)

## spop

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_spop/<key>`  
>**Method:** `POST`  
>**Body:**  

<section class="http"></section>

```litcoffee
{
  // optional
  "count": <number of elements to remove>
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "spop",
  "_id": "<key>",
  "body": {
    // optional
    "count": <number of elements to remove>
  }
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "spop",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": "<removed element>"
}
```

Removes and returns one or more elements at random from a set of unique values. If multiple elements are removed, the result set will be an array of removed elements, instead of a string.

[[_Redis documentation_]](https://redis.io/commands/spop)

## srandmember

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_srandmember/<key>[?count=<count>]`  
>**Method:** `GET`  

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "srandmember",
  "_id": "<key>",
  // optional
  "count": <count>
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "srandmember",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": "<member value>"
}
```

Returns one or more members of a set of unique values, at random.  
If `count` is provided and is positive, the returned values are unique. If `count` is negative, a set member can be returned multiple times.

If more than 1 member is returned, the result set will be an array of values instead of a string.

[[_Redis documentation_]](https://redis.io/commands/srandmember)

## srem

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_srem/<key>`  
>**Method:** `DELETE`  
>**Body:**  

<section class="http"></section>

```litcoffee
{
  "members": ["member1", "member2", "..."]
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "srem",
  "_id": "<key>",
  "body": {
    "members": ["member1", "member2", "..."]
  }
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "srem",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": <number of removed members>
}
```

Removes members from a set of unique values.

[[_Redis documentation_]](https://redis.io/commands/srem)

## sscan

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_sscan/<key>?cursor=<cursor>[&match=<pattern>][&count=<count>]`  
>**Method:** `GET`  

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "sscan",
  "_id": "<key>",
  "cursor": <cursor>,

  // optional
  "match": "<pattern>",
  "count": <count>
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "sscan",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": [
    <new cursor position>,
    [
      "member1",
      "member2",
      "..."
    ]
  ]
}
```

Identical to [scan](#scan) but iterates members contained in a set of unique values.


[[_Redis documentation_]](https://redis.io/commands/sscan)

## strlen

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_strlen/<key>`  
>**Method:** `GET`  


<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "strlen",
  "_id": "<key>"
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "strlen",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": <string length>
}
```

Returns the length of a value stored at `key`.

[[_Redis documentation_]](https://redis.io/commands/strlen)

## sunion

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_sunion?keys=key1,key2,...`  
>**Method:** `GET`  

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "sunion",
  "keys": ["key1", "key2", "..."]
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "sunion",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": [
    "value1",
    "value2",
    "..."
  ]
}
```

Returns the union of sets of unique values.

[[_Redis documentation_]](https://redis.io/commands/sunion)

## sunionstore

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_sunionstore`  
>**Method:** `POST`  
>**Body:**  

<section class="http"></section>

```litcoffee
{
  "destination": "<destination key>",
  "keys": ["key1", "key2", "..."]
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "sunionstore",
  "body": {
    "destination": "<destination key>",
    "keys": ["key1", "key2", "..."]
  }
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "sunionstore",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": <number of members in the new set>
}
```

Computes the union of multiple sets of unique values and stores it in a new set at `destination key`.

If the destination key already exists, it is overwritten.

[[_Redis documentation_]](https://redis.io/commands/sunionstore)

## time

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_time`  
>**Method:** `GET`  

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "time"
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "time",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": [
    <Epoch time>,
    <microseconds>
  ]
}
```

Returns the current server time as a two items list: a timestamp in [Epoch time](https://en.wikipedia.org/wiki/Unix_time) and the number of microseconds already elapsed in the current second.

[[_Redis documentation_]](https://redis.io/commands/time)

## touch

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_touch`  
>**Method:** `POST`  
>**Body:**  

<section class="http"></section>

```litcoffee
{
  "keys": ["key1", "key2", "..."]
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "touch",
  "body": {
    "keys": ["key1", "key2", "..."]
  }
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "touch",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": <number of touched keys>
}
```

Alters the last access time of one or multiple keys. A key is ignored if it does not exist.

[[_Redis documentation_]](https://redis.io/commands/touch)

## ttl

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_ttl/<key>`  
>**Method:** `GET`  

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "ttl",
  "_id": "<key>"
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "ttl",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": <remaining time to live, in seconds>
}
```

Returns the remaining time to live of a key, in seconds, or a negative value if the key does not exist or if it is persistent.

[[_Redis documentation_]](https://redis.io/commands/ttl)

## type

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_type/<key>`  
>**Method:** `GET`  

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "type",
  "_id": "<key>"
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "type",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": "[hash|list|string|set|zset]"
}
```

Returns the type of the value held by a key.

[[_Redis documentation_]](https://redis.io/commands/type)

## zadd

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_zadd/<key>`  
>**Method:** `POST`  
>**Body:**  

<section class="http"></section>

```litcoffee
{
  "elements": [
    {"score": <score1>, "member": "<value1>"},
    {"score": <score2>, "member": "<value2>"},
    {"score": <...>, "member": "<...>"}
  ],

  // optional parameters
  "nx": [false|true],
  "xx": [false|true],
  "ch": [false|true],
  "incr": [false|true]
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "zadd",
  "_id": "<key>",
  "body": {
    "elements": [
      {"score": <score1>, "member": "<value1>"},
      {"score": <score2>, "member": "<value2>"},
      {"score": <...>, "member": "<...>"}
    ],

    // optional parameters
    "nx": [false|true],
    "xx": [false|true],
    "ch": [false|true],
    "incr": [false|true]
  }
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "zadd",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": <number of added elements>
}
```

Adds the specified elements to the sorted set stored at `key`. If the key does not exist, it is created, holding an empty sorted set. If it already exists and does not hold a sorted set, an error is returned.

Scores are expressed as floating point numbers.

If a member to insert is already in the sorted set, its score is updated and the member is reinserted at the right position in the set.

Optional parameters may be provided to change the default behavior:

* `nx`: only add new elements, do not update existing ones
* `xx`: never add new elements, update only existing ones
* `ch`: instead of returning the number of added elements, returns the number of changes performed
* `incr`: instead of adding elements, increments the existing member with the provided `score`. Only one score/element pair can be specified if this option is set

[[_Redis documentation_]](https://redis.io/commands/zadd)

## zcard

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_zcard/<key>`  
>**Method:** `GET`  


<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "zcard",
  "_id": "<key>"
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "zcard",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": <number of elements in the set>
}
```

Returns the number of elements held by a sorted set.

[[_Redis documentation_]](https://redis.io/commands/zcard)

## zcount

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_zcount/<key>?min=<min score>&max=<max score>`  
>**Method:** `GET`  

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "zcount",
  "_id": "<key>",
  "min": "<min score>",
  "max": "<max score>"
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "zcount",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": <number of elements in the specified range>
}
```

Returns the number of elements held by a sorted set with a score between the provided `min` and `max` values.

By default, the provided min and max values are inclusive. This behavior can be changed using the syntax described in the Redis [ZRANGEBYSCORE](https://redis.io/commands/zrangebyscore) documentation.

[[_Redis documentation_]](https://redis.io/commands/zcount)

## zincrby

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_zincrby/<key>`  
>**Method:** `POST`  
>**Body:**  

<section class="http"></section>

```litcoffee
{
  "member": "<member>",
  "value": <increment>
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "zincrby",
  "_id": "<key>",
  "body": {
    "member": "<member>",
    "value": <increment>
  }
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "zincrby",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": <new score value>
}
```

Increments the score of a `member`in a sorted set by the provided `value`.

[[_Redis documentation_]](https://redis.io/commands/zincrby)

## zinterstore

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_zinterstore/<key>`  
>**Method:** `POST`  
>**Body:**  

<section class="http"></section>

```litcoffee
{
  "keys": ["key1", "key2", "..."],

  // optional parameters
  "weights": ["weight1", "weight2", "..."],
  "aggregate": "[sum|min|max]"
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "zinterstore",
  "_id": "<key>",
  "body": {
    "keys": ["key1", "key2", "..."],

    // optional parameters
    "weights": ["weight1", "weight2", "..."],
    "aggregate": "[sum|min|max]"
  }
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "zinterstore",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": <the number of elements in the new sorted set>
}
```

Computes the intersection of the provided sorted sets given by the specified `keys`, and stores the result in a new sorted set at `key`.

Optional parameters:

* `weights`: specifies a multiplication factor for each input sorted set
* `aggregate` (default: `sum`): specifies how members' scores are aggregated during the intersection

[[_Redis documentation_]](https://redis.io/commands/zinterstore)

## zlexcount

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_zlexcount/<key>?min=<min value>&max=<max value>`  
>**Method:** `GET`  

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "zlexcount",
  "_id": "<key>",
  "min": "<min value>",
  "max": "<max value>"
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "zlexcount",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": <elements count>
}
```

Counts elements in a sorted set where all members have equal score, using lexicographical ordering. The `min` and `max` values are inclusive by default. To change this behavior, please check the syntax detailed in the [Redis documentation](https://redis.io/commands/zrangebylex).

[[_Redis documentation_]](https://redis.io/commands/zlexcount)

## zrange

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_zrange/<key>?start=<index start>&stop=<index stop>[&options=withscores]`  
>**Method:** `GET`  

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "zrange",
  "_id": "<key>",
  "start": <index start>,
  "stop": <index stop>,

  // optional
  "options": ["withscores"]
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "zrange",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": [
    "element1",
    "element2",
    "..."
  ]
}
```

Returns elements from a sorted set depending on their position, from a `start` position index to a `stop` position index (inclusive).

The `withscores` option includes the respective elements' scores in the result set, using the following format: `["element1 value", "element1 score", "element2 value", "element2 score", ...]`.

[[_Redis documentation_]](https://redis.io/commands/zrange)

## zrangebylex

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_zrangebylex/<key>?min=<min interval>&max=<max interval>[&limit=offset,count]`  
>**Method:** `GET`  

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "zrangebylex",
  "_id": "<key>",
  "min": "<min interval>",
  "max": "<max interval>",

  // optional
  "limit": [<offset>, <count>]
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "zrangebylex",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": [
    "element1",
    "element2",
    "..."
  ]
}
```

Returns elements in a sorted set where all members have equal score, using lexicographical ordering. The `min` and `max` values are inclusive by default. To change this behavior, please check the full documentation.

The optional LIMIT argument can be used to only get a range of the matching elements (similar to _SELECT LIMIT offset, count_ in SQL).

[[_Redis documentation_]](https://redis.io/commands/zrangebylex)

## zrevrangebylex

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_zrevrangebylex/<key>?min=<min interval>&max=<max interval>[&limit=offset,count]`  
>**Method:** `GET`  

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "zrevrangebylex",
  "_id": "<key>",
  "min": "<min interval>",
  "max": "<max interval>",

  // optional
  "limit": [<offset>, <count>]
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "zrevrangebylex",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": [
    "...",
    "element2",
    "element1"
  ]
}
```

Identical to [zrangebylex](#zrangebylex) except that the sorted set is traversed in descending order.

[[_Redis documentation_]](https://redis.io/commands/zrevrangebylex)

## zrangebyscore

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_zrangebyscore/<key>?min=<min interval>&max=<max interval>[&limit=offset,count][&options=withscores]`  
>**Method:** `GET`  

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "zrangebyscore",
  "_id": "<key>",
  "min": "<min interval>",
  "max": "<max interval>",

  // optional
  "limit": [<offset>, <count>],
  "options": ["withscores"]
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "zrangebyscore",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": [
    "element1",
    "element2",
    "..."
  ]
}
```

Returns all the elements in the sorted set at key with a score between `min` and `max` (inclusive). The elements are considered to be ordered from low to high scores.

The optional LIMIT argument can be used to only get a range of the matching elements (similar to _SELECT LIMIT offset, count_ in SQL).

The `withscores` option includes the respective elements' scores in the result set, using the following format: `["element1 value", "element1 score", "element2 value", "element2 score", ...]`.

[[_Redis documentation_]](https://redis.io/commands/zrangebyscore)

## zrank

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_zrank/<key>/<member>`  
>**Method:** `GET`  


<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "zrank",
  "_id": "<key>",
  "member": "<member>"
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "zrank",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": <element's position in the sorted set>
}
```

Returns the position of an element in a sorted set, with scores in ascending order. The index returned is 0-based (the lowest score member has an index of 0).

[[_Redis documentation_]](https://redis.io/commands/zrank)

## zrem

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_zrem/<key>`  
>**Method:** `DELETE`  
>**Body:**  

<section class="http"></section>

```litcoffee
{
  "members": ["member1", "member2", "..."]
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "zrem",
  "_id": "<key>",
  "body": {
    "members": ["member1", "member2", "..."]
  }
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "zrem",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": <number of removed members>
}
```

Removes members from a sorted set.

[[_Redis documentation_]](https://redis.io/commands/zrem)

## zremrangebylex

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_zremrangebylex/<key>`  
>**Method:** `DELETE`  
>**Body:**  

<section class="http"></section>

```litcoffee
{
  "min": "<min interval>",
  "max": "<max interval>"
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "zremrangebylex",
  "_id": "<key>",
  "body": {
    "min": "<min interval>",
    "max": "<max interval>"
  }
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "zremrangebylex",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": <number of removed members>
}
```

Removes members from a sorted set where all elements have the same score, using lexicographical ordering. The `min` and `max` interval are inclusive, see the [Redis documentation](https://redis.io/commands/zrangebylex) to change this behavior.

[[_Redis documentation_]](https://redis.io/commands/zremrangebylex)

## zremrangebyrank

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_zremrangebyrank/<key>`  
>**Method:** `DELETE`  
>**Body:**  

<section class="http"></section>

```litcoffee
{
  "start": "<index start>",
  "stop": "<index stop>"
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "zremrangebyrank",
  "_id": "<key>",
  "body": {
    "start": "<index start>",
    "stop": "<index stop>"
  }
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "zremrangebyrank",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": <number of removed members>
}
```

Removes members from a sorted set with their position in the set between `start` and `stop` (inclusive).

Positions are 0-based, meaning the first member of the set has a position of 0.

[[_Redis documentation_]](https://redis.io/commands/zremrangebyrank)

## zremrangebyscore

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_zremrangebyscore/<key>`  
>**Method:** `DELETE`  
>**Body:**  

<section class="http"></section>

```litcoffee
{
  "min": "<min interval>",
  "max": "<max interval>"
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "zremrangebyscore",
  "_id": "<key>",
  "body": {
    "min": "<min interval>",
    "max": "<max interval>"
  }
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "zremrangebyscore",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": <number of removed members>
}
```

Removes members from a sorted set with a score between `min` and `max`.

The `min` and `max` values are inclusive, but this behavior can be changed (see the [redis documentation](https://redis.io/commands/zrangebyscore)).

[[_Redis documentation_]](https://redis.io/commands/zremrangebylex)

## zrevrange

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_zrevrange/<key>?start=<index start>&stop=<index stop>[&options=withscores]`  
>**Method:** `GET`  

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "zrevrange",
  "_id": "<key>",
  "start": <index start>,
  "stop": <index stop>,

  // optional
  "options": ["withscores"]
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "zrevrange",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": [
    "...",
    "element2",
    "element1"
  ]
}
```

Identical to [zrange](#zrange), except that the sorted set is traversed in descending order.

[[_Redis documentation_]](https://redis.io/commands/zrevrange)

## zrevrangebyscore

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_zrevrangebyscore/<key>?min=<min interval>&max=<max interval>[&limit=offset,count][&options=withscores]`  
>**Method:** `GET`  

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "zrevrangebyscore",
  "_id": "<key>",
  "min": "<min interval>",
  "max": "<max interval>",

  // optional
  "limit": [<offset>, <count>],
  "options": ["withscores"]
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "zrevrangebyscore",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": [
    "...",
    "element2",
    "element1"
  ]
}
```

Identical to [zrangebyscore](#zrangebyscore) except that the sorted set is traversed in descending order.

[[_Redis documentation_]](https://redis.io/commands/zrevrangebyscore)

## zrevrank

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_zrevrank/<key>/<member>`  
>**Method:** `GET`  


<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "zrevrank",
  "_id": "<key>",
  "member": "<member>"
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "zrevrank",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": <element's position in the sorted set>
}
```

Returns the position of an element in a sorted set, with scores in descending order. The index returned is 0-based (the lowest score member has an index of 0).

[[_Redis documentation_]](https://redis.io/commands/zrevrank)

## zscan

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_zscan/<key>?cursor=<cursor>[&match=<pattern>][&count=<count>]`  
>**Method:** `GET`  

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "zscan",
  "_id": "<key>",
  "cursor": <cursor>,

  // optional
  "match": "<pattern>",
  "count": <count>
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "zscan",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": [
    <new cursor position>,
    [
      "element1",
      "score of element1",
      "element2",
      "score of element2",
      "..."
    ]
  ]
}
```

Identical to [scan](#scan) but iterates the elements stored in a sorted set.


[[_Redis documentation_]](https://redis.io/commands/zscan)

## zscore

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_zscore/<key>/<member>`  
>**Method:** `GET`  


<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "zscore",
  "_id": "<key>",
  "member": "<member>"
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "zscore",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": <score>
}
```

Returns the score of an element in a sorted set.

[[_Redis documentation_]](https://redis.io/commands/zscore)

## zunionstore

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_zunionstore/<key>`  
>**Method:** `POST`  
>**Body:**  

<section class="http"></section>

```litcoffee
{
  "keys": ["key1", "key2", "..."],

  // optional parameters
  "weights": ["weight1", "weight2", "..."],
  "aggregate": "[sum|min|max]"
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "zunionstore",
  "_id": "<key>",
  "body": {
    "keys": ["key1", "key2", "..."],

    // optional parameters
    "weights": ["weight1", "weight2", "..."],
    "aggregate": "[sum|min|max]"
  }
}
```

>Response

```litcoffee
{
  "requestId": "<unique request identifier>",
  "status": 200,
  "error": null,
  "controller": "ms",
  "action": "zunionstore",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": <the number of elements in the new sorted set>
}
```

Computes the union of the provided sorted sets given by the specified `keys`, and stores the result in a new sorted set at `key`.

Optional parameters:

* `weights`: specifies a multiplication factor for each input sorted set
* `aggregate` (default: `sum`): specifies how members' scores are aggregated during the intersection

[[_Redis documentation_]](https://redis.io/commands/zunionstore)
