---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: searchUsers
---


# searchUsers



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/users/_search[?from=0][&size=42][&scroll=<time to live>]`  
**Method:** `POST`  
**Body**
</p>
</blockquote>

```js
{
  "filter": {
    "and": [
      {
        "in": {
          "profileId": ["anonymous", "default"],
        }
      },
      {
        "geo_distance": {
          "distance": "10km",
          "pos": {
            "lat": "48.8566140",
            "lon": "2.352222"
          }
        }
      }
    ]
  }
}
```

<blockquote class="json">
<p>
**Query**
</p>
</blockquote>

```json
{
  "controller": "security",
  "action": "searchUsers",
  "body": {
    "filter": {
      "and": [
        {
          "in": {
            "profileId": [
              "anonymous",
              "default"
            ],
          }
        },
        {
          "geo_distance": {
            "distance": "10km",
            "pos": {
              "lat": "48.8566140",
              "lon": "2.352222"
            }
          }
        }
      ]
    }
  },

  "from": 0,
  "size": 10,
  "scroll": "<time to live>"
}
```

>**Response**

```javascript
{
  "status": 200,                     
  "error": null,                     
  "index": "%kuzzle",
  "collection": "users",
  "action": "search",
  "controller": "security",
  "requestId": "<unique request identifier>",
  "result": {
    "total": "<total number of users matching the filter>",
    // An array of user objects
    "hits": [
      {
        "_id": "<kuid>",
        "_source": { ... }             // The user object content
      },
      {
        ...
      }
    ]
  }
}
```

Retrieves users matching the provided filter.

Optional arguments:

* `size` controls the maximum number of documents returned in the response
* `from` is usually used with the `size` argument, and defines the offset from the first result you want to fetch
* `scroll` allows to fetch large result sets, and it must be set with a [time duration](https://www.elastic.co/guide/en/elasticsearch/reference/current/common-options.html#time-units). If set, a forward-only cursor will be created (and automatically destroyed at the end of the set duration), and its identifier will be returned in the `scrollId` property, along with the first page of results. This cursor can then be moved forward using the [`scrollUsers` API action]({{ site_base_path }}api-documentation/controller-security/scroll-users)
