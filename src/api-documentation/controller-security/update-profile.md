---
layout: side-code.html.handlebars
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: updateProfile
---


# updateProfile

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/profiles/<profileId>/_update[?refresh=wait_for]`  
**Method:** `PUT`  
**Body**
</p>
</blockquote>

```js
{
    "policies": [
      {
        "roleId": "<roleId>"
      },
      {
        "roleId": "<roleId>",
        "restrictedTo": [
          {
            "index": "<index>"
          },
          {
            "index": "<index>",
            "collections": [
              "<coll1>",
              "<coll2>"
            ]
          }
        ]
      },
      ...
    ]
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
  "action": "updateProfile",
  "refresh": "wait_for",
  "_id": "<profileId>",
  "body": {
    "policies": [
      {
        "roleId": "<roleId>"
      },
      {
        "roleId": "<roleId>",
        "restrictedTo": [
          {
            "index": "<index>"
          },
          {
            "index": "<index>",
            "collections": [
              "<coll1>",
              "<coll2>"
            ]
          }
        ]
      },
    ]
  }
}
```

>**Response**

```javascript
{
  "status": 200,                     
  "error": null,                     
  "index": "%kuzzle",
  "collection": "profiles",
  "action": "updateProfile",
  "controller": "security",
  "requestId": "<unique request identifier>",
  "result": {
    "_id": "<profileId>",
    "_index": "%kuzzle",
    "_type": "profiles",
    "_version": 2
  }
}
```

Given a `profileId`, updates the matching Profile object in Kuzzle.

The optional parameter `refresh` can be used
with the value `wait_for` in order to wait for the profile to be indexed (indexed profiles are available for `search`).
