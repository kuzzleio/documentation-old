---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: getConfig
---

# getConfig



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/_getConfig`  
**Method:** `GET`
</p>
</blockquote>

<blockquote class="json">
<p>
**Query**
</p>
</blockquote>


```json
{
  "controller": "server",
  "action": "getConfig"
}
```

>**Response**

```javascript
{
  "status": 200,                     
  "error": null,                     
  "action": "getConfig",
  "controller": "server",
  "result": {
     "plugins": {
       "common": {
         "workerPrefix": "kpw:",
         "pipeWarnTime": 40,
         "pipeTimeout": 250
       },
       "kuzzle-plugin-xxx": {
         "some": "configuration",
         "specific": "to this instance"
       }
     },
     "repositories": {
       "common": {
         "cacheTTL": 1440
       }
     },
     "limits": {
       "requestsHistorySize": 50,
       "concurrentRequests": 50,
       "requestsBufferSize": 50000,
       "requestsBufferWarningThreshold": 5000,
       "documentsFetchCount": 1000,
       "documentsWriteCount": 200
     },
     "services": {
       "common": {
         "defaultInitTimeout": 10000,
         "retryInterval": 1000
       },
       "internalCache": {
         "backend": "redis",
         "node": {
           "host": "redis",
           "port": 6379
         }
       },
       "memoryStorage": {
         "backend": "redis",
         "database": 5,
         "node": {
           "host": "redis",
           "port": 6379
         }
       },
       "internalBroker": {
         "aliases": [
           "broker"
         ],
         "socket": "./run/broker.sock",
         "retryInterval": 1000
       },
       "proxyBroker": {
         "host": "proxy",
         "port": 7331,
         "retryInterval": 1000
       },
       "db": {
         "aliases": [
           "storageEngine"
         ],
         "backend": "elasticsearch",
         "host": "elasticsearch",
         "port": 9200,
         "apiVersion": "<elasticsearch api version>",
         "defaults": {
           "scrollTTL": "15s"
         }
       },
       "garbageCollector": {
         "cleanInterval": 86400000,
         "maxDelete": 1000
       }
     },
     "stats": {
       "ttl": 3600,
       "statsInterval": 10
     },
     "validation": {},
     "dump": {
       "enabled": false,
       "path": "./dump/",
       "gcore": "gcore",
       "dateFormat": "YYYYMMDD-HHmm",
       "handledErrors": {
         "enabled": true,
         "whitelist": [
           "RangeError",
           "TypeError",
           "KuzzleError",
           "InternalError"
         ]
       }
     },
     "version": "<current kuzzle version>"
   }
 }
}
```

Returns the current Kuzzle configuration.

<aside class="warning" style="float: none;clear: left;width: 46%;">
This route should be opened only to administrators, as it might export sensitive informations about servers configuration or plugins private configuration.
</aside>
