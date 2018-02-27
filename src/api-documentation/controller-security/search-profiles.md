---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: searchProfiles
---


# searchProfiles

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/profiles/_search[?from=0][&size=42][&scroll=<time to live>]`  
**Method:** `POST`  
**Body**
</p>
</blockquote>

```js
{
  // An array of roles used by the searched profiles
  "roles": [
    "firstRoleId",
    "admin"
  ]
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
  "action": "searchProfiles",
  "body": {
    "roles": [
      "myRoleId",
      "admin"
    ]
  },

  "from": 0,
  "size": 42,
  "scroll": "<time to live>"
}
```

>**Response**

```javascript
{
  "status": 200,                     
  "error": null,                     
  "result":
  {
    "_shards": {
      "failed": 0,
      "successful": 5,
      "total": 5
    },
    "hits": [
      {
        "_id": "firstProfileId",
        "_source": {
          "policies": [
            {
              "roleId": "firstRoleId",
              "restrictedTo": [
                ...
              ]
            },
            ...
          ]
        }
      },
      {
        "_id": "secondProfileId",
        "_source": {
          "policies": [
            {
              "roleId": "admin"
            },
            ...
          ]
        }
      }
    ],
    "total": 2
  },
  "index": "%kuzzle",
  "collection": "profiles"
  "action": "searchProfiles",
  "controller": "security",
  "requestId": "<unique request identifier>"
}
```

Returns profiles linked to a given set of roles.


Optional arguments:

* `body.roles` contains an array of role identifiers used to filter the search results
* `size` controls the maximum number of documents returned in the response
* `from` is usually used with the `size` argument, and defines the offset from the first result you want to fetch
* `scroll` is used to fetch large result sets, and it must be set with a [time duration](https://www.elastic.co/guide/en/elasticsearch/reference/5.4/common-options.html#time-units). If set, a forward-only cursor will be created (and automatically destroyed at the end of the set duration), and its identifier will be returned in the `scrollId` property, along with the first page of the results. This cursor can then be moved forward using the [`scrollProfiles` API action]({{ site_base_path }}api-documentation/controller-security/scroll-profiles)
