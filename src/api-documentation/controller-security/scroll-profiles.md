---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: scrollProfiles
---


# scrollProfiles

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/profiles/_scroll/<scrollId>[?scroll=<time to live>]`  
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
  "action": "scrollProfiles",
  "scrollId": "<scrollId>",
  "scroll": "<time to live>"
}
```

>**Response**

```javascript
{
  "status": 200,
  "error": null,
  "action": "scrollProfiles",
  "controller": "security",
  "requestId": "<unique request identifier>",
  "result": {
    // scroll requests may return a new scroll identifier
    // only the most recent scrollId should be used
    "scrollId": "<new scroll id>",

    // An array of objects containing your retrieved documents
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
        ...
      }
    ],
    "total": "<number of found profiles>"
  }
}
```

This method moves a result set cursor forward, created by a [`searchProfiles` query]({{ site_base_path }}api-documentation/controller-security/search-profiles) with the `scroll` argument provided.

The response may contain a *different* cursor identifier, pointing to the next page of results.

The optional `scroll` argument allows you to refresh the cursor duration,using the [time to live](https://www.elastic.co/guide/en/elasticsearch/reference/5.4/common-options.html#time-units) value.

<aside class="warning">
  The results that are returned from a `scrollProfiles` request reflect the state of the index at the time
  that the initial search request was made, like a snapshot in time. Subsequent changes
  to documents (index, update or delete) will only affect later search requests.
</aside>
