# ~ server controller


## adminExists

<section class="http"></section>

>**URL:** `http://kuzzle:7511/_adminExists`  
>**Method:** `GET`

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "server",
  "action": "adminExists"
}
```

>Response

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

>**URL:** `http://kuzzle:7511/_getAllStats`  
>**Method:** `GET`

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "server",
  "action": "getAllStats"
}
```

>Response

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

>**URL:** `http://kuzzle:7511/_getConfig`  
>**Method:** `GET`

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "server",
  "action": "getConfig"
}
```

>Response

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "action": "getConfig",
  "controller": "server",
  "result": {
    "kuzzle": {
      "_": [
        "start"
      ],
      "dump": {
        "dateFormat": "YYYYMMDD-HHmm",
        "enabled": false,
        "gcore": "gcore",
        "handledErrors": {
          "enabled": true,
          "whitelist": [
            "RangeError",
            "TypeError",
            "KuzzleError",
            "InternalError",
            "PluginImplementationError"
          ]
        },
        "path": "./dump/"
      },
      "http": {
        "accessControlAllowOrigin": "*",
        "routes": [
          {
            "action": "exists",
            "controller": "collection",
            "url": "/:index/:collection/_exists",
            "verb": "get"
          },
          /*
           * ... A long list of http routes ...
           */
        ]
      },
      "plugins": {
        "common": {
          "object": {},
          "pipeTimeout": 250,
          "pipeWarnTime": 40,
          "workerPrefix": "kpw:"
        },
        "kuzzle-plugin-auth-passport-local": {
          "activated": true,
          "config": {
            "algorithm": "sha1",
            "digest": "hex",
            "secret": "changeme"
          },
          "object": {},
          "version": "3.0.2"
        },
        "kuzzle-plugin-logger": {
          "activated": true,
          "config": {
            "services": {
              "file": {
                "addDate": true,
                "outputs": {
                  "error": {
                    "filename": "kuzzle.log",
                    "level": "warn"
                  }
                }
              },
              "stdout": {
                "level": "info"
              }
            },
            "threads": 2
          },
          "object": {},
          "version": "2.0.5"
        }
      },
      "queues": {
        "cliQueue": "cli-queue"
      },
      "repositories": {
        "common": {
          "cacheTTL": 1440
        }
      },
      "security": {
        "default": {
          "role": {
            "controllers": {
              "*": {
                "actions": {
                  "*": true
                }
              }
            }
          }
        },
        "jwt": {
          "algorithm": "HS256",
          "expiresIn": "1h",
          "secret": "Kuzzle rocks"
        },
        "restrictedProfileIds": [
          "default"
        ],
        "standard": {
          "profiles": {
            "admin": {
              "policies": [
                {
                  "allowInternalIndex": true,
                  "roleId": "admin"
                }
              ]
            },
            "anonymous": {
              "policies": [
                {
                  "roleId": "anonymous"
                }
              ]
            },
            "default": {
              "policies": [
                {
                  "roleId": "default"
                }
              ]
            }
          },
          "roles": {
            "admin": {
              "controllers": {
                "*": {
                  "actions": {
                    "*": true
                  }
                }
              }
            },
            "anonymous": {
              "controllers": {
                "auth": {
                  "actions": {
                    "checkToken": true,
                    "getCurrentUser": true,
                    "getMyRights": true,
                    "login": true
                  }
                },
                "server": {
                  "actions": {
                    "info": true
                  }
                }
              }
            },
            "default": {
              "controllers": {
                "auth": {
                  "actions": {
                    "checkToken": true,
                    "getCurrentUser": true,
                    "getMyRights": true,
                    "logout": true,
                    "updateSelf": true
                  }
                },
                "server": {
                  "actions": {
                    "info": true
                  }
                }
              }
            }
          }
        }
      },
      "server": {
        "maxConcurrentRequests": 50,
        "maxRequestHistorySize": 50,
        "maxRetainedRequests": 50000,
        "warningRetainedRequestsLimit": 5000
      },
      "services": {
        "common": {
          "defaultInitTimeout": 10000,
          "retryInterval": 1000
        },
        "db": {
          "aliases": [
            "storageEngine"
          ],
          "apiVersion": "5.0",
          "backend": "elasticsearch",
          "host": "elasticsearch",
          "port": 9200
        },
        "garbageCollector": {
          "cleanInterval": 86400000,
          "maxDelete": 1000
        },
        "internalBroker": {
          "aliases": [
            "broker"
          ],
          "retryInterval": 1000,
          "socket": "./run/broker.sock"
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
        "proxyBroker": {
          "host": "proxy",
          "port": 7331,
          "retryInterval": 1000
        }
      },
      "stats": {
        "statsInterval": 10,
        "ttl": 3600
      },
      "validation": {},
      "version": "1.0.0-RC8"
    },
    "plugins": {
      "config": {
        "kuzzle-plugin-auth-passport-local": {
          "activated": true,
          "config": {
            "algorithm": "sha1",
            "digest": "hex",
            "secret": "changeme"
          },
          "version": "3.0.2"
        },
        "kuzzle-plugin-logger": {
          "activated": true,
          "config": {
            "services": {
              "file": {
                "addDate": true,
                "outputs": {
                  "error": {
                    "filename": "kuzzle.log",
                    "level": "warn"
                  }
                }
              },
              "stdout": {
                "level": "info"
              }
            },
            "threads": 2
          },
          "version": "2.0.5"
        }
      },
      "routes": []
    }
  }
}
```

Return the current Kuzzle configuration as loaded at Kuzzle start.


## getLastStats

<section class="http"></section>

>**URL:** `http://kuzzle:7511/_getLastStats`  
>**Method:** `GET`

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "server",
  "action": "getLastStats"
}
```

>Response

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
This command allows getting the last stored statistics frame.
By default, snapshots are made every 10s.

These statistics include:

* the number of connected users per protocol for the ones which allow to get this information (websocket, udp, ...)
* the number of ongoing requests
* the number of completed requests since the last frame
* the number of failed requests since the last frame

Statistics are returned as a JSON-object with each key being the snapshot's timestamp (utc, in milliseconds).


## getStats

<section class="http"></section>

>**URL:** `http://kuzzle:7511/_getStats[?startTime=123456789][&stopTime=234567890]`  
>**Method:** `POST`

<section class="others"></section>

>Query

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

>Response

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

This command allows getting statistics frames saved/stored after a provided timestamp (utc, in milliseconds).

These statistics include:

* the number of connected users per protocol for the ones which allow to get this information (websocket, udp, ...)
* the number of ongoing requests
* the number of completed requests since the last frame
* the number of failed requests since the last frame

Statistics are returned as a JSON-object with each key being the snapshot's timestamp (utc, in milliseconds).


## info

<section class="http"></section>

>**URL:** `http://kuzzle:7511/_serverInfo`  
>**Method:** `GET`

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "server",
  "action": "info"
}
```

> Response

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
                "method": "get",
                "name": "action1",
                "route": "..."
              },
              "action2": {
                "method": "post",
                "name": "action2",
                "route": "..."
              },
              {
                "etc...": "etc ..."
              }
            },
            "controller2": {
              "action1": {
                "method": "get",
                "name": "action1",
                "route": "..."
              },
              "action2": {
                "method": "post",
                "name": "action2",
                "route": "..."
              },
              {
                "etc...": "etc ..."
              }
            },
            {
              "etc...": "etc ..."
            }
          },
          "version": "1.0"
        },
        "memoryUsed": 82747392,
        "nodeVersion": "v4.4.3",
        "plugins": {},
        "system": {
          "cpus": [
            {
              "model": "Intel(R) Core(TM) i5-4670 CPU @ 3.40GHz",
              "speed": 2700,
              "times": {
                "idle": 19767912700,
                "irq": 73805400,
                "nice": 66474700,
                "sys": 588744200,
                "user": 1733754000
              }
            },
            {
              "etc...": "etc ..."
            }
          ],
          "memory": {
            "free": 1157988352,
            "total": 16768524288
          }
        },
        "uptime": "349.923s",
        "version": "1.0.0-RC4"
      },
      "services": {
        "internalCache": {
          "memoryPeak": "1.06M",
          "memoryUsed": "978.63K",
          "mode": "standalone",
          "type": "redis",
          "version": "3.0.7"
        },
        "memoryStorage": {
          "memoryPeak": "1.06M",
          "memoryUsed": "1014.62K",
          "mode": "standalone",
          "type": "redis",
          "version": "3.0.7"
        },
        {
          "etc...": "etc ..."
        }
      }
    }
  }
}
```

Retrieves information about Kuzzle, its plugins and active services.


## now

<section class="http"></section>

>**URL:** `http://kuzzle:7511/_now`  
>**Method:** `GET`

<section class="others"></section>

```litcoffee
{
  "controller": "server",
  "action": "now"
}
```

>Response

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

Return the current Kuzzle UTC timestamp as Epoch time (number of milliseconds elapsed since 1 January 1970 00:00:00).
