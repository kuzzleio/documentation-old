---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: scrollSpecifications
---

# scrollSpecifications

{{{since "1.0.0"}}}

<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/validations/_scroll/&lt;scrollId&gt;[?scroll=&lt;time to live&gt;]</code>  
<br><b>Method:</b> <code>GET</code>
</p>
</blockquote>

<blockquote class="json">
<p>
<b>Query</b>
</p>
</blockquote>


```json
{
  "controller": "collections",
  "action": "scrollSpecifications",
  "scrollId": "<scrollId>",
  "scroll": "<time to live>"
}
```

>**Response**

```javascript
{
  "status": 200,
  "error": null,
  "action": "scrollSpecifications",
  "controller": "collection",
  "requestId": "<unique request identifier>",
  "result": {
    // scroll requests may return a new scroll identifier
    // only the most recent scrollId should be used
    "scrollId": "<new scroll id>",

    // An array of objects containing your retrieved documents
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
      },
      {
        ...
      }
    ],
    "total": <number of found specifications>
  }
}
```

This method moves a result set cursor forward, created by the [`searchSpecifications` request]({{ site_base_path }}api-documentation/controller-collection/search-specifications/) when the `scroll` argument is provided.

The response may contain a *different* cursor identifier, pointing to the next page of the results.

The optional `scroll` argument allows you to set the cursor duration by using the [time to live](https://www.elastic.co/guide/en/elasticsearch/reference/5.4/common-options.html#time-units) value.

<aside class="warning">
  The results that are returned from a `scrollSpecifications` request reflect the state of the index at the time
  that the initial search request was made, like a snapshot in time. Subsequent changes
  to documents (index, update or delete) will only affect later search requests.
</aside>

### Possible errors

- [Common errors]({{ site_base_path }}api-documentation/errors/#common-errors)
- [NotFoundError]({{ site_base_path }}api-documentation/errors/#notfounderror)
