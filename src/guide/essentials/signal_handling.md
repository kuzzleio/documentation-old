---
layout: full.html
algolia: true
title: Signal Handling
order: 1000
---

# Signal Handling

Kuzzle caught some Unix signals, they are distributed in 3 categories :

 * Abnormal termination
 * Normal termination
 * Dump report generation

The code related to signal handling can be seen here : [lib/api/kuzzle.js#L183](https://github.com/kuzzleio/kuzzle/blob/master/lib/api/kuzzle.js#L183)

## Abnormal termination

Concerned signals :
 * `SIGQUIT`
 * `SIGABRT`
 * `SIGPIPE`

These signals represents a critical error and will force Kuzzle to quit.  
When one of the signal above is caught, Kuzzle will first generate a [dump report]({{ site_base_path }}guide/essentials/cli#dump) and then quit directly.  

## Normal termination  

Concerned signals :
 * `SIGTERM`
 * `SIGINT`

These signals represents a willingness to quit Kuzzle gracefully.  
Once one of the signal above is caught, Kuzzle will refuse new requests, exit the cluster, finish the current request queue and then quit.  

## Dump report

Concerned signals :
 * `SIGTRAP`

These signals are used to generate a [dump report]({{ site_base_path }}guide/essentials/cli#dump). Once caught, Kuzzle will generate a dump report and continue to serve requests normally.
