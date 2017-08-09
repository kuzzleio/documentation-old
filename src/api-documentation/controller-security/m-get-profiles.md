---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: mGetProfiles
---


# mGetProfiles



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/profiles/_mGet`  
**Method:** `POST`  
**Body:**
</p>
</blockquote>


```js
{
  // ids must be an array of profile ids
  "ids": ["firstProfileId", "secondProfileId"]
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
  "action": "mGetProfiles",
  "body": {
    "ids": ["firstProfileId", "secondProfileId"]
  }
}
```

>**Response**

```javascript
{
  "status": 200,                     
  "error": null,                     
  "index": "%kuzzle",
  "collection": "profiles"
  "action": "mGetProfiles",
  "controller": "security",
  "requestId": "<unique request identifier>",
  "result": {
     "_shards": {
       "failed": 0,
       "successful": 5,
       "total": 5
     },
     "hits": [
       {
         "_id": "firstProfileId",
         "_index": "%kuzzle",
         "_score": 1,
         "_source": {
           "policies": [
             // Policies associated to the profile
           ]
         },
         "_type": "profiles"
       },
       {
         "_id": "secondProfileId",
         "_index": "%kuzzle",
         "_score": 1,
         "_source": {
           "policies": [
             // Policies associated to the profile
           ]
         },
         "_type": "profiles"
       }
     ],
     "max_score": null,
     "timed_out": false,
     "took": 1,
     "total": 2
  }
}
```

Retrieves a list of `profile` objects from Kuzzle's database layer given a list of profile ids.
