---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: mGetRoles
---


# mGetRoles



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/roles/_mGet`  
**Method:** `POST`  
**Body:**
</p>
</blockquote>


```js
{
  // ids must be an array of role id
  "ids": ["firstRoleId", "secondRoleId"]
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
  "action": "mGetRoles",
  "body": {
    "ids": ["firstRoleId", "secondRoleId"]
  }
}
```

>**Response**

```javascript
{
  "action": "mGetRoles",
  "collection": "roles",
  "controller": "security",
  "error": null,
  "index": "%kuzzle",
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
         "_id": "firstRoleId",
         "_index": "%kuzzle",
         "_score": 1,
         "_source": {
           "controllers": {
             // Rights for each controllers and actions can be found here
           }
         },
         "_type": "roles"
       },
       {
         "_id": "secondRoleId",
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
     "total": 2
  },
  "status": 200
}
```

Retrieves a list of `role` objects from Kuzzle's database layer given a list of role ids.
