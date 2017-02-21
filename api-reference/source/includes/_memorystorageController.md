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

Full documentation [here](https://redis.io/commands/append)

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

Full documentation [here](https://redis.io/commands/bitcount)

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

Full documentation [here](https://redis.io/commands/bitop)

## bitpos

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_bitpos/<key>/<0|1>[?start=<integer>&end=<integer>]`  
>**Method:** `GET`  

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "bitpos",
  "_id": "<key>",
  "bit": <0|1>,
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

Full documentation [here](https://redis.io/commands/bitpos)

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

Returns the number of keys in the application database

Full documentation [here](https://redis.io/commands/dbsize)

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

Decrements the number stored at key by one. If the key does not exist, it is set to 0 before performing the operation

Full documentation [here](https://redis.io/commands/decr)

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

Decrements the number stored at key by a provided integer value. If the key does not exist, it is set to 0 before performing the operation

Full documentation [here](https://redis.io/commands/decrby)

## del

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_del`  
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

Deletes a list of keys

Full documentation [here](https://redis.io/commands/del)

## dump

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_dump/<key>`  
>**Method:** `GET`  

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "dump",
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
  "action": "dump",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": "serialized value"
}
```

Returns the serialized raw value of a key

Full documentation [here](https://redis.io/commands/dump)

## exists

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_exists/<key>`  
>**Method:** `GET`  

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "exists",
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
  "action": "exists",
  "collection": null,
  "index": null,
  "metadata": null,
  "result": <0|1>
}
```

Checks if a key exists in the database

Full documentation [here](https://redis.io/commands/exists)

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

Sets a timeout on a key.  After the timeout has expired, the key will automatically be deleted

Full documentation [here](https://redis.io/commands/expire)

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

Full documentation [here](https://redis.io/commands/expireat)

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

Deletes all the keys of the database dedicated to client applications (the reserved space for Kuzzle is unaffected)

Full documentation [here](https://redis.io/commands/flushdb)

## geoadd

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_geoadd/<key>`  
>**Method:** `POST`  
**Body:**

<section class="http"></section>

```litcoffee
{
  "longitude": <float between -180 and 180>,
  "latitude": <float between -85.05112878 and 85.05112878>,
  "name": "point name"
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
    "longitude": <float between -180 and 180>,
    "latitude": <float between -85.05112878 and 85.05112878>,
    "name": "point name"
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
  "result": 1
}
```

Adds a geospatial point to the specified key

Full documentation [here](https://redis.io/commands/geoadd)

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

Full documentation [here](https://redis.io/commands/geodist)

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

Full documentation [here](https://redis.io/commands/geohash)

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

Full documentation [here](https://redis.io/commands/geopos)

## georadius

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_georadius/<key>?longitude=<longitude>&latitude=<latitude>&distance=<distance>&unit=[m|km|mi|ft][&options=option1,option2,...]`  
>**Method:** `GET`  


<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "georadius",
  "_id": "<key>",
  "longitude": <longitude>,
  "latitude": <latitude>,
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

The `options` parameter accepts the following options: `withcoord`, `withdist`, `count <count>`, `asc` and `desc`  
The provided count value for the `count` option must be passed as a separate option.  
For instance, `&options=count,<count>` for HTTP requests, or `options: ['count', <count>]` for other protocols.

The `result` format may change if `options` parameters are provided: instead of an array of value, the result may instead be an array of arrays (for instance with `withdist` or `withcoord` options).

Full documentation [here](https://redis.io/commands/georadius)

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

The `options` parameter accepts the following options: `withcoord`, `withdist`, `count <count>`, `asc` and `desc`  
The provided count value for the `count` option must be passed as a separate option.  
For instance, `&options=count,<count>` for HTTP requests, or `options: ['count', <count>]` for other protocols.

The `result` format may change if `options` parameters are provided: instead of an array of value, the result may instead be an array of arrays (for instance with `withdist` or `withcoord` options).

Full documentation [here](https://redis.io/commands/georadiusbymember)

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

Returns the value of a key, or `null` if the key doesn't exist

Full documentation [here](https://redis.io/commands/get)

## getbit

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_getbit/<key>/<offset>`  
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
  "result": <0|1>
}
```

Returns the bit value at the provided offset, in the string value stored in a key

Full documentation [here](https://redis.io/commands/getbit)

## getrange

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_getrange/<key>/<start>/<end>`  
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

Returns a substring of a key's value

Full documentation [here](https://redis.io/commands/getrange)

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

Sets a new value for a key and returns the previous stored value

Full documentation [here](https://redis.io/commands/getset)

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

Removes fields from the hash stored in the provided key

Full documentation [here](https://redis.io/commands/hdel)

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
  "result": <0|1>
}
```

Checks if a field exists in a hash stored at the provided key

Full documentation [here](https://redis.io/commands/hexists)

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

Returns the field's value of a hash stored at the provided key

Full documentation [here](https://redis.io/commands/hget)

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

Returns all fields and values of a hash stored at the provided key

Full documentation [here](https://redis.io/commands/hgetall)

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

Increments the number stored in a hash field at the provided key, by a given integer value

Full documentation [here](https://redis.io/commands/hincrby)

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

Increments the number stored in a hash field at the provided key, by a given float value

Full documentation [here](https://redis.io/commands/hincrbyfloat)

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

Returns all field names in the hash stored at the provided key

Full documentation [here](https://redis.io/commands/hkeys)

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

Returns the number of fields contained in the hash stored at the provided key

Full documentation [here](https://redis.io/commands/hlen)

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

Returns the values of the specified hash's fields

Full documentation [here](https://redis.io/commands/hmget)

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

Sets multiple fields at once in a hash stored at the provided key.

Full documentation [here](https://redis.io/commands/hmset)

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
  "result": <0|1>
}
```

Sets a field and its value in a hash stored at the provided key. If the key does not exist, a new key holding a hash is created. If the field already exists, its value is overwritten

Full documentation [here](https://redis.io/commands/hset)

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
  "result": <0|1>
}
```

Sets a field and its value in a hash stored at the provided key, only if the field does not already exist.

Full documentation [here](https://redis.io/commands/hsetnx)

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

Returns the string length of a field's value, in a hash stored at the provided key

Full documentation [here](https://redis.io/commands/hstrlen)

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

Returns all values in the hash stored at the provided key

Full documentation [here](https://redis.io/commands/hvals)

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

Increments the number stored at key by one. If the key does not exist, it is set to 0 before performing the operation

Full documentation [here](https://redis.io/commands/incr)

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

Increments the number stored at key by a provided integer value. If the key does not exist, it is set to 0 before performing the operation

Full documentation [here](https://redis.io/commands/incrby)

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

Increments the number stored at key by a provided float value. If the key does not exist, it is set to 0 before performing the operation

Full documentation [here](https://redis.io/commands/incrbyfloat)

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

Full documentation [here](https://redis.io/commands/keys)

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

Returns the element at the provided index in the list stored at the provided key.

Full documentation [here](https://redis.io/commands/lindex)

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

Inserts a value in the list stored at the provided key, either before or after the reference pivot value.

Full documentation [here](https://redis.io/commands/linsert)

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

Returns the length of a list

Full documentation [here](https://redis.io/commands/llen)

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

Removes and returns the first element of a list

Full documentation [here](https://redis.io/commands/lpop)
