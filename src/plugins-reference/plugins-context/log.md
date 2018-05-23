---
layout: full.html.hbs
algolia: true
title: log
order: 400
---

# log

{{{since "1.0.0"}}}

These methods can be used to send messages to Kuzzle's logging system.  
Different log levels are supported, and lower priority levels can be ignored depending on how Kuzzle is configured.

The lower the log level, the higher its priority.

## `error`

{{{since "1.0.0"}}}

Priority: 0 (highest priority)

```js
context.log.error('error message');
```

## `warn`

{{{since "1.0.0"}}}

Priority: 1

```js
context.log.warn('warn message');
```

## `info`

{{{since "1.0.0"}}}

Priority: 2

```js
context.log.info('info message');
```

## `verbose`

{{{since "1.0.0"}}}

Priority: 3

```js
context.log.verbose('verbose message');
```

## `debug`

{{{since "1.0.0"}}}

Priority: 4

```js
context.log.debug('debug message');
```

## `silly`

{{{since "1.0.0"}}}

Priority: 5 (lowest priority)

```js
context.log.silly('silly message');
```
