# ~ server controller

## adminExists

<section class="http"></section>

>**URL:** `http://kuzzle:7512/_adminExists`  
>**Method:** `GET`

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "server",
  "action": "adminExists"
}
```

>**Response**

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "index": "<index>",
  "action": "adminExists",
  "controller": "server",
  "requestId": "<unique request identifier>",
  "result": {
    "exists": true
  }
}
```

Checks if an administrator account has been created, and return a boolean as a result.


## getAllStats

<section class="http"></section>

>**URL:** `http://kuzzle:7512/_getAllStats`  
>**Method:** `GET`

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "server",
  "action": "getAllStats"
}
```

>**Response**

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "action": "getAllStats",
  "controller": "server",
  "requestId": "<unique request identifier>",
  "result": {
    "total": 25,
    "hits": [
      {
        "completedRequests": {
          "websocket": 148,
          "http": 24,
          "mqtt": 78
        },
        "failedRequests": {
          "websocket": 3
        },
        "ongoingRequests": {
          "mqtt": 8,
          "http": 2
        }
        "connections": {
          "websocket": 13
        },
        "timestamp": "1453110641308"
      },
      ...
    ]
  }
}
```

Kuzzle monitors its internal activities and make snapshots regularly. This command allows getting all the stored statistics.
By default, snapshots are made every 10s, and these snapshots are stored for 1hr.

These statistics include:

* the number of connected users per protocol for the ones which allow to get this information (websocket, udp, ...)
* the number of ongoing requests
* the number of completed requests since the last frame
* the number of failed requests since the last frame

Statistics are returned as a JSON-object with each key being the snapshot's timestamp (utc, in milliseconds).


## getConfig


<section class="http"></section>

>**URL:** `http://kuzzle:7512/_getConfig`  
>**Method:** `GET`

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "server",
  "action": "getConfig"
}
```

>**Response**

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
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

<aside class="warning" style="float:left;clear:left">
This route should be opened only to administrators, as it might export sensitive informations about servers configuration or plugins private configuration.
</aside>

## getLastStats

<section class="http"></section>

>**URL:** `http://kuzzle:7512/_getLastStats`  
>**Method:** `GET`

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "server",
  "action": "getLastStats"
}
```

>**Response**

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "action": "getLastStats",
  "controller": "server",
  "requestId": "<unique request identifier>",
  "result": {
    "completedRequests": {
      "websocket": 148,
      "http": 24,
      "mqtt": 78
    },
    "failedRequests": {
      "websocket": 3
    },
    "ongoingRequests": {
      "mqtt": 8,
      "http": 2
    }
    "connections": {
      "websocket": 13
    },
    "timestamp": "1453110641308"
  }
}
```

Kuzzle monitors its internal activities and make snapshots regularly.
Allows to get the last stored statistics frame.
By default, snapshots are made every 10s.

These statistics include:

* the number of connected users per protocol for the ones which allow to get this information (websocket, udp, ...)
* the number of ongoing requests
* the number of completed requests since the last frame
* the number of failed requests since the last frame

Statistics are returned as a JSON-object with each key being the snapshot's timestamp (utc, in milliseconds).


## getStats

<section class="http"></section>

>**URL:** `http://kuzzle:7512/_getStats[?startTime=123456789][&stopTime=234567890]`  
>**Method:** `POST`

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "server",
  "action": "getStats",

  // Optional: Kuzzle will return all statistics if nor the startTime and stopTime are defined
  "startTime": <timestamp>,
  "stopTime": <timestamp>
}
```

>**Response**

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "action": "getStats",
  "controller": "server",
  "requestId": "<unique request identifier>",
  "result": {
    "total": 25,
    "hits": [
      {
        "completedRequests": {
          "websocket": 148,
          "http": 24,
          "mqtt": 78
        },
        "failedRequests": {
          "websocket": 3
        },
        "ongoingRequests": {
          "mqtt": 8,
          "http": 2
        }
        "connections": {
          "websocket": 13
        },
        "timestamp": "1453110641308"
      },
      {
        "etc...": "etc ..."
      }
    ]
  }
}
```

Allows to get statistics frames saved/stored after a provided timestamp (utc, in milliseconds).

These statistics include:

* the number of connected users per protocol for the ones which allow to get this information (websocket, udp, ...)
* the number of ongoing requests
* the number of completed requests since the last frame
* the number of failed requests since the last frame

Statistics are returned as a JSON-object with each key being the snapshot's timestamp (utc, in milliseconds).


## info

<section class="http"></section>

>**URL:** `http://kuzzle:7512/_serverInfo`  
>**Method:** `GET`

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "server",
  "action": "info"
}
```

>**Response**

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "controller": "server",
  "action": "info",
  "result": {
    "serverInfo": {
      "kuzzle": {
        "api": {
          "routes": {
            "controller1": {
              "action1": {
                "controller": "controller1",
                "action": "action1",
                "http": {
                  "verb": "GET",
                  "url": "/action1/url"
                }
              },
              "action2": {
                "controller": "controller1",
                "action": "action2",
                "http": {
                  "verb": "POST",
                  "url": "/action2/url"
                }
              },
              {
                "...": "..."
              }
            },
            "pluginName/controller": {
              "action": {
                "controller": "pluginName/controller",
                "action": "action",
                "http": {
                  "verb": "GET",
                  "url": "/action/url"
                }
              },
              {
                "...": " ..."
              }
            },
            {
              "...": "..."
            }
          },
          "version": "<API version>"
        },
        "memoryUsed": 12345,
        "nodeVersion": "v6.9.5",
        "plugins": {},
        "system": {
          "cpus": [
            {
              "cpu1": "informations"
            },
            {
              "...": "..."
            }
          ],
          "memory": {
            "free": 123456,
            "total": 1234567
          }
        },
        "uptime": "<uptime, in seconds>",
        "version": "<kuzzle version>"
      },
      "services": {
        "internalCache": {
          "kuzzle memory cache": "informations",
          "...": "..."
        },
        "memoryStorage": {
          "API memory storage": "informations",
          "...": "..."
        },
        {
          "...": "..."
        }
      }
    }
  }
}
```

Retrieves information about Kuzzle, its plugins and active services.


## now

<section class="http"></section>

>**URL:** `http://kuzzle:7512/_now`  
>**Method:** `GET`

<section class="others"></section>

```litcoffee
{
  "controller": "server",
  "action": "now"
}
```

>**Response**

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "controller": "server",
  "action": "now",
  "requestId": "<unique request identifier>",
  "result": {
    "now": 1447151167622              // Epoch time
  }
}
```

Returns the current Kuzzle UTC timestamp as Epoch time (number of milliseconds elapsed since 1 January 1970 00:00:00).
