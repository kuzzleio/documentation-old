---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: scrollUsers
---


# scrollUsers



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/users/_scroll/<scrollId>[?scroll=<time to live>]`  
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
  "controller": "security",
  "action": "scrollUsers",
  "scrollId": "<scrollId>",

  "scroll": "<time to live>"
  }
}
```

>**Response**

```javascript
{
  "status": 200,                     
  "error": null,                     
  "action": "scrollUsers",
  "controller": "security",
  "requestId": "<unique request identifier>",
  "result": {
    // scroll requests may return a new scroll identifier
    // only the most recent scrollId should be used
    "scrollId": "<new scroll id>",

    // An array of objects containing your retrieved documents
    "hits": [
      {
        "_id": "<firstKuid>",
        "_source": { ... }             // The user object content
      },
      {
        ...
      }
    ],
    "total": "<number of found users>"
  }
}
```

This method moves forward a result set cursor created by a [`searchUsers` query]({{ site_base_path }}api-documentation/controller-security/search-users) with the `scroll` argument provided.

The response may contain a *different* cursor identifier, pointing to the next page of results.

The optional `scroll` argument allows to refresh the cursor duration, with a new [time to live](https://www.elastic.co/guide/en/elasticsearch/reference/current/common-options.html#time-units) value.

<aside class="warning">
  The results that are returned from a `scrollUsers` request reflect the state of the index at the time
  that the initial search request was made, like a snapshot in time. Subsequent changes
  to documents (index, update or delete) will only affect later search requests.
</aside>
