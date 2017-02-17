# ~ memoryStorage controller

Kuzzle's memory storage is a data store separated from the database layer.
It is internally based on Redis. You can access most of Redis functions (all lowercased), except:

* cluster based functions
* script based functions
* cursor functions

Here is the exhaustive list of non-implemented commands:

`auth`
`bitfield`
`client`
`cluster`
`config`
`debug`
`echo`
`eval`
`evalsha`
`flushall`
`migrate`
`monitor`
`move`
`psubscribe`
`pubsub`
`punsubscribe`
`quit`
`readonly`
`readwrite`
`role`
`script`
`select`
`shutdown`
`slaveof`
`slowlog`
`subscribe`
`sync`
`unsubscribe`
`scan`
`sscan`
`hscan`
`zscan`

## append

Appends a value to a key. If the key does not exist, it is created.

Full documentation [here](https://redis.io/commands/append)

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_append/<key>`  
>**Method:** `POST`  
>**Body:**  

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
  "_id": "key identifier"
  "body": {
    "value": "value to be appended to the key"
  }
}
```

>Response

```litcoffee
{
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
}
```

## bgrewriteaof

Forces a rewrite the transaction logs, optimizing it in the process.

Full documentation [here](https://redis.io/commands/bgrewriteaof)

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_bgrewriteaof`  
>**Method:** `POST`  
>**Body:**  

<section class="http"></section>

```litcoffee
{
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "bgrewriteaof",
}
```

>Response

```litcoffee
{
  {
    "requestId": "<unique request identifier>",
    "status": 200,
    "error": null,
    "controller": "ms",
    "action": "bgrewriteaof",
    "collection": null,
    "index": null,
    "metadata": null,
    "result": "Background append only file rewriting started"
  }
}
```

## bgsave

Saves the database in the background.

Full documentation [here](https://redis.io/commands/bgsave)

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_bgsave`  
>**Method:** `POST`  
>**Body:**  

<section class="http"></section>

```litcoffee
{
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "bgsave",
}
```

>Response

```litcoffee
{
  {
    "requestId": "<unique request identifier>",
    "status": 200,
    "error": null,
    "controller": "ms",
    "action": "bgsave",
    "collection": null,
    "index": null,
    "metadata": null,
    "result": "Background saving started"
  }
}
```

## bitcount

Counts the number of set bits (population counting) in a string.  
The `start` and `end` parameters are optional.

Full documentation [here](https://redis.io/commands/bitcount)

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_bitcount/<key>[?start=<integer>][&end=<integer>]`  
>**Method:** `GET`  
>**Body:**  

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "bitcount",
  "_id": "key identifier",
  "start": <integer>,
  "end": <integer>
}
```

>Response

```litcoffee
{
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
}
```

## bitop

Performs a bitwise operation between multiple keys (containing string values) and stores the result in the destination key.

Full documentation [here](https://redis.io/commands/bitop)

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
}
```

## bitpos

Returns the position of the first bit set to 1 or 0 in a string, or in a substring.

Full documentation [here](https://redis.io/commands/bitpos)

<section class="http"></section>

>**URL:** `http://kuzzle:7512/ms/_bitpos`  
>**Method:** `POST`  
>**Body:**  

<section class="http"></section>

```litcoffee
{
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "ms",
  "action": "bgsave",
}
```

>Response

```litcoffee
{
  {
    "requestId": "<unique request identifier>",
    "status": 200,
    "error": null,
    "controller": "ms",
    "action": "bgsave",
    "collection": null,
    "index": null,
    "metadata": null,
    "result": "Background saving started"
  }
}
```
