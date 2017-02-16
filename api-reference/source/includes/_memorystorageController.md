# ~ memoryStorage controller

Kuzzle's memory storage is a data store separated from the database layer.
It is internally based on Redis. You can access most of Redis functions (all lowercased), except:

* cluster based functions
* script based functions
* cursor functions

Here is the exhaustive list of non implemented commands:

`auth`
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
