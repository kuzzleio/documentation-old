---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: createOrReplaceProfile
---


# createOrReplaceProfile



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/profiles/<profileId>`
**Method:** `PUT`
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
      "roleId": "<anotherRoleId>",
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
  "action": "createOrReplaceProfile",
  "_id": "<profileId>",              

  "body": {
    "policies": [
      {
        "roleId": "<anotherRoleId>"
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
    "_source": {
      ...
    }
    "created": false,
  },
  "requestId": "<unique request identifier>",
  "controller": "security",
  "action": "createOrReplaceProfile",
  "volatile": {}
}
```

Creates or replaces (if `_id` matches an existing one) a profile with a list of policies.
