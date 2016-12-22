# ~ memoryStorage controller


## Description

<section class="http"></section>

>**URL:** `http://kuzzle:7511/ms/_ping`  
>**Method:** `GET`

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "action": "ping",
  "controller": "ms",
  "metadata": {},
  "requestId": "<unique request identifier>"
}
```

> Response

```litcoffee
{
  "status": 200,
  "error": null,
  "requestId": "<unique request identifier>",
  "controller": "ms",
  "action": "ping",
  "metadata": {},
  "result": "PONG"
}
```

Kuzzle's memory storage is a separate data store from the database layer.
It is internaly based on Redis. You can access most of Redis functions (all lowercased), except:

* all cluster based functions
* all script based functions
* all cursors functions

Here is the list of non implemented commands:

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

You can find a list of all redis command at: [http://redis.io/commands](http://redis.io/commands)