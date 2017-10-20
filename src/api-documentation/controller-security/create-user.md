---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: createUser
---


# createUser

{{{since "1.0.0"}}}


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
    "profileIds": ["<profileId>"],          // Required
    "name": "John Doe",                     // Additional optional User properties
    ...
  },
  "credentials": {
    "strategy-name": {
      ...
    }
  }
}

// example with the "local" authentication strategy

{
  "content": {
    "profileIds": ["<profileId>"],          // Required
    "name": "John Doe",                     // Additional optional User properties
    ...
  },
  "credentials": {
    "local": {
      "username": "MyUser",                 // ie: Mandatory for "local" authentication plugin
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
      "name": "John Doe"                 
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

If an `_id` is provided in the query and if a user [`<kuid>`]({{ site_base_path }}guide/essentials/user-authentication/#kuzzle-user-identifier-kuid) already exists, an error is returned.
If not provided, the `_id` will be auto-generated.

The body content describes the user to be created, and it must have the following properties:

* `content` (JSON object): user global properties
  * This object must contain a `profileIds` properties, an array of strings listing the [profiles]({{ site_base_path }}guide/essentials/security/#users-profiles-and-roles) to be attached to the new user 
  * Any other property will be copied as additional global user information
* `credentials` (JSON object): a description of how the new user can authentify himself to Kuzzle
  * Any number of credentials can be added, each one being an object whose name is the one of the [authentication strategy]({{ site_base_path }}plugins-reference/plugins-features/adding-authentication-strategy/#expose-authentication-strategies) that can be used for authentification, and its content the necessary login information for that user
  * If that object is left empty, the described user will be created by Kuzzle but (s)he  won't be able to log in
