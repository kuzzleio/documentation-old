---
layout: full.html
algolia: true
title: log
order: 400
---

# log


These methods can be used to send messages to Kuzzle's log system.  
Different log level are provided, and lower priority levels may be ignored depending on how the Kuzzle server is configured.

The lower a log level is, the higher its priority.

## `error`

Priority: 0 (highest priority)

```js
context.log.error('error message');
```

## `warn`

Priority: 1

```js
context.log.warn('warn message');
```

## `info`

Priority: 2

```js
context.log.info('info message');
```

## `verbose`

Priority: 3

```js
context.log.verbose('verbose message');
```

## `debug`

Priority: 4

```js
context.log.debug('debug message');
```

## `silly`

Priority: 5 (lowest priority)

```js
context.log.silly('silly message');
```
