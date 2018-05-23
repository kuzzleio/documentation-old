---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: createProfile
---


# createProfile

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/profiles/<profileId>/_create[?refresh=wait_for]`  
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

Creates a security profile with a new list of roles.

The optional parameter `refresh` can be used
with the value `wait_for` in order to wait for the profile to be indexed (indexed profiles are available for `search`).

**Note:** The `_id` parameter is mandatory.
