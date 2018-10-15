---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: createOrReplaceProfile
---


# createOrReplaceProfile

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
<b>URL:</b> `http://kuzzle:7512/profiles/<profileId>[?refresh=wait_for]`
</br><b>Method:</b> `PUT`
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
<b>Query</b>
</p>
</blockquote>

```json
{
  "controller": "security",
  "action": "createOrReplaceProfile",
  "refresh": "wait_for",
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

Creates or replaces a profile with a list of policies (if `_id` matches an existing one).

The optional parameter `refresh` can be used
with the value `wait_for` in order to wait for the profile to be indexed (indexed profiles are available for `search`).
