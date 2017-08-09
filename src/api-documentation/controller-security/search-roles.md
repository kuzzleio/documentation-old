---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: searchRoles
---


# searchRoles



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/roles/_search[?from=0][&size=42]`  
**Method:** `POST`  
**Body:**
</p>
</blockquote>


```js
{
  // indexes must be an array of controllers
  "controllers": ["aController", "anotherController"]
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
  "action": "searchRoles",
  "body": {
    "controllers": ["aController", "anotherController"],

    "from": 0,
    "size": 42
  }
}
```

>**Response**

```javascript
{
  "action": "searchRoles",
  "collection": "roles",
  "controller": "security",
  "error": null,
  "index": "%kuzzle",
  "volatile": {},
  "requestId": "<unique request identifier>",
  "result":
  {
     "_shards": {
       "failed": 0,
       "successful": 5,
       "total": 5
     },
     "hits": [
       {
         "_id": "<roleId>",
         "_index": "%kuzzle",
         "_score": 1,
         "_source": {
           "controllers": {
             // Rights for each controllers and actions can be found here
           }
         },
         "_type": "roles"
       }
     ],
     "max_score": null,
     "timed_out": false,
     "took": 1,
     "total": 1
  },
  "status": 200
}
```

Retrieves all roles with rights defined for given `indexes`.

Attribute `indexes` in body is optional.

The `from` and `size` arguments allow pagination.

Available filters:

| Filter | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``indexes`` | array | List of indexes id related to the searched role | ``undefined`` |
