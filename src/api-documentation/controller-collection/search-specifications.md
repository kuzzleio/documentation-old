---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: searchSpecifications
---

# searchSpecifications

{{{since "1.0.0"}}}

<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/validations/_search[?from=0][&size=10][&scroll=&lt;time to live&gt;]</code>  
<br><b>Method:</b> <code>POST</code>  
<br><b>Body</b>
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
<b>Query</b>
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
* `scroll` is used to fetch large result sets, and it must be set with a [time duration](https://www.elastic.co/guide/en/elasticsearch/reference/5.4/common-options.html#time-units). If set, a forward-only cursor will be created (and automatically destroyed at the end of the set duration), and its identifier will be returned in the `scrollId` property, along with the first page of the results. This cursor can then be moved forward using the [`scrollSpecifications` API action]({{ site_base_path }}api-documentation/controller-collection/scroll-specifications)

### Possible errors

- [Common errors]({{ site_base_path }}api-documentation/errors/#common-errors)
