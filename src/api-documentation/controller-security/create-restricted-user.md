---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: createRestrictedUser
---


# createRestrictedUser



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/users/<kuid>/_createRestricted` or `http://kuzzle:7512/users/_createRestricted`  
**Method:** `POST`  
**Body**
</p>
</blockquote>

```js
{
  "content": {
    "name": "John Doe",                     // Additional optional User properties
    ...
  },
  "credentials": {
    "strategy-name": {
      ...
    }
  }
}

// example with a "local" authentication

{
  "content": {
    "name": "John Doe",                     // Additional optional User properties
    ...
  },
  "credentials": {
    "local": {
      "username": "MyUser"                  // ie: Mandatory for "local" authentication plugin
      "password": "MyPassword"              // ie: Mandatory for "local" authentication plugin
    }
  }
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
  "action": "createRestrictedUser",
  "_id": "<kuid>",                           
  "body": {
    "content": {
      "name": "John Doe",    
    },
    "credentials": {
      "strategy-name": {
      }
    }
  }
}
```

```json
{
  "controller": "security",
  "action": "createRestrictedUser",
  "_id": "<kuid>",                        
  "body": {
    "content": {
      "profileIds": ["<profileId>"],   
      "name": "John Doe",                 
    },
    "credentials": {
      "local": {
        "username": "MyUser",
        "password": "MyPassword"
      }
    }
  }
}
```

>**Response**

```javascript
{
  "status": 200,
  "error": null,
  "index": "%kuzzle",
  "collection": "users",
  "controller": "security",
  "action": "createRestrictedUser",
  "volatile": {},
  "requestId": "<unique request identifier>",
  "result": {
    "_id": "<kuid>",
    "_index": "%kuzzle",
    "_source": {
      "profileIds": ["<profileId>"],
      "name": "John Doe",
      ...
    },
    "_type": "users",
    "_version": 1,
    "created": true
  }
}
```

Creates a new `user` in Kuzzle's database layer.

If an `_id` is provided in the query and if a `user` already exists with the given `_id`, an error is returned.
If not provided, the `_id` will be auto-generated.

Profile ids are set accordingly to the Kuzzle configuration.
This route is especially useful to allow anonymous users to create a user.

Other mandatory additional information are needed in the `credentials` attribute depending on the installed authentication plugins you want to use.
