---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: searchSpecifications
---

# searchSpecifications



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/validations/_search[?from=0][&size=10][&scroll=<time to live>]`  
**Method:** `POST`  
**Body**
</p>
</blockquote>


```js
{
  // A set of filters or queries matching documents you are looking for.
  "query": {
    ...
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
  "controller": "collection",
  "action": "searchSpecifications",
  "body": {
    "query": {
      "Some": "filters"
    }
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
  "controller": "collection",
  "action": "searchSpecifications",
  "volatile": {},
  "requestId": "<unique request identifier>",
  "result": {
    "_shards": {
        "failed": 0,
        "successful": 5,
        "total": 5
    },
    "hits": [
      {
        "_id": "myIndex#myCollection",
        "_index": "%kuzzle",
        "_score": 1,
        "_source": {
          "collection": "myCollection",
          "index": "myIndex",
          "validation": {
            "fields": {
              "fieldName": {
                "defaultValue": "a default value",
                "mandatory": true,
                "multivalued": {
                  "maxCount": 5,
                  "minCount": 1,
                  "value": true
                },
                "type": "string",
                "typeOptions": {
                  "length": {
                    "max": 12,
                    "min": 2
                  }
                }
              }
            },
            "strict": true
          }
        },
        "_type": "validations"
      }
    ],
    "total": <number of specifications>
  }
}
```

Allows to search in the persistence layer for collection specifications.

Optional arguments:

* `size` controls the maximum number of documents returned in the response
* `from` is usually used with the `size` argument, and defines the offset from the first result you want to fetch
* `scroll` allows to fetch large result sets, and it must be set with a [time duration](https://www.elastic.co/guide/en/elasticsearch/reference/current/common-options.html#time-units). If set, a forward-only cursor will be created (and automatically destroyed at the end of the set duration), and its identifier will be returned in the `scrollId` property, along with the first page of results. This cursor can then be moved forward using the [`scrollSpecifications` API action]({{ site_base_path }}api-documentation/controller-collection/scroll-specifications)
