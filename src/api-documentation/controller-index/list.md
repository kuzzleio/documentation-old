---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: list
---

# list

{{{since "1.0.0"}}}

<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/_list`  
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
  "controller": "index",
  "action": "list"
}
```

>**Response**

```javascript
{
  "status": 200,
  "error": null,
  "controller": "index",
  "action": "list",
  "requestId": "<unique request identifier>",
  "result": {
    "indexes": [
      "index_1",
      "index_2",
      "index_...",
      "index_n"
    ]
  }
}
```

Returns the complete list of data indexes.

### Possible errors

- one of the [common errors]({{ site_base_path }}api-documentation/errors/#common-errors)
