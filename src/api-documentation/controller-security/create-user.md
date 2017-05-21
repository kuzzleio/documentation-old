---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: createUser
---


# createUser



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/users/<kuid>/_create` or `http://kuzzle:7512/users/_create`  
**Method:** `POST`  
**Body**
</p>
</blockquote>

```js
{
  "content": {
    "profileIds": ["<profileId>"],          // Mandatory. The profile ids for the user
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
    "profileIds": ["<profileId>"],          // Mandatory. The profile ids for the user
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
  "action": "createUser",
  "_id": "<kuid>",      
  "body": {
    "content": {
      "profileIds": ["<profileId>"],    
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
  "action": "createUser",
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
  "action": "createUser",
  "volatile": {},
  "requestId": "<unique request identifier>",
  "result": {
    "_id": "<kuid>", // The kuzzle user identifier
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

If an `_id` is provided in the query and if a user [`<kuid>`]({{ site_base_path }}guide/kuzzle-depth/authentication/#the-kuzzle-user-identifier-kuid) already exists, an error is returned.
If not provided, the `_id` will be auto-generated.

Provided profile ids are used to set the permissions of the user.

Other mandatory additional information are needed in the `credentials` attribute depending on the installed authentication plugins you want to use.
