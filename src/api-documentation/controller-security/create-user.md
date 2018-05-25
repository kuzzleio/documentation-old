---
layout: side-code.html.hbs
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
**URL:** `http://kuzzle:7512/users/<kuid>/_create[?refresh=wait_for]` or `http://kuzzle:7512/users/_create[?refresh=wait_for]`  
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
  "refresh": "wait_for",
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
  "refresh": "wait_for",
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

Creates a new `user` in Kuzzle.

If an `_id` is provided in the query and if a user [`<kuid>`]({{ site_base_path }}guide/essentials/user-authentication/#kuzzle-user-identifier-kuid) already exists, an error is returned.
If not provided, the `_id` will be generated automatically.

The optional parameter `refresh` can be used
with the value `wait_for` in order to wait for the user to be indexed (indexed users are available for `search`).

The body contains the user data and must have the following properties:

* `content` (JSON object): user global properties
  * This object must contain a `profileIds` properties, an array of strings listing the security [profiles]({{ site_base_path }}guide/essentials/security/#users-profiles-and-roles) that will be attached to the new user 
  * Any other property will be copied as additional global user information
* `credentials` (JSON object): a description of how the new user can authenticate themselves to Kuzzle
  * Any number of credentials can be added, each with a key named after the [authentication strategy]({{ site_base_path }}plugins-reference/plugins-features/adding-authentication-strategy/#exposing-authentication-strategies) used to validate the credentials
  * If the credentials object is left empty, the described user will be created by Kuzzle but they will not be able log in
