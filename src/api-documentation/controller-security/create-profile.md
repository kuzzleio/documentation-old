---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: createProfile
---


# createProfile



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/profiles/<profileId>/_create`  
**Method:** `POST`  
**Body**
</p>
</blockquote>

```js
{
  // The new array of role IDs and restrictions (cannot be empty)
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
  "action": "createProfile",
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
  "result": {
    "_id": "<profileId>",
    "_index": "%kuzzle",
    "_type": "profiles",
    "_version": 1,
    "created": true,
    "_source": {} // your profile definition
  },
  "requestId": "<unique request identifier>",
  "controller": "security",
  "action": "createProfile",
  "volatile": {},
}
```

Creates a profile with a new list of roles.

**Note:** The `_id` parameter is mandatory.
