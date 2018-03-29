---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: info
---

# info

{{{since "1.0.0"}}}


<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/_serverInfo`  
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
  "action": "info"
}
```

>**Response**

```javascript
{
  "status": 200,
  "error": null,
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
                "nproutes": 2,
                 "http": [
                  {
                    "verb": "GET",
                    "url": "/action1/url"
                  },
                  {
                    "verb": "GET",
                    "url": "/action1/url/:variable"
                  }
                ]
              },
              "action2": {
                "controller": "controller1",
                "action": "action2",
                "nproutes": 1,
                "http": [
                  {
                    "verb": "POST",
                    "url": "/action2/url"
                  }
                ]
              },
              {
                "...": "..."
              }
            },
            "pluginName/controller": {
              "action": {
                "controller": "pluginName/controller",
                "action": "action",
                "nproutes": 1,
                "http": [
                  {
                    "verb": "GET",
                    "url": "/action/url"
                  }
                ]
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
