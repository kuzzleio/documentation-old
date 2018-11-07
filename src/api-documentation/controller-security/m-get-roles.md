---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: mGetRoles
---


# mGetRoles

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/roles/_mGet</code>  
<br><b>Method:</b> <code>POST</code>  
<br><b>Body:</b>
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
<b>Query</b>
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

Retrieves a list of `role` objects from Kuzzle given a list of role ids.
