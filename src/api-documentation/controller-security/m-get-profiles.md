---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: mGetProfiles
---


# mGetProfiles

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
<b>URL:</b> `http://kuzzle:7512/profiles/_mGet`  
</br><b>Method:</b> `POST`  
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
<b>Query</b>
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

Retrieves a list of security `profile` objects from Kuzzle given a list of profile ids.
