---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: createFirstAdmin
---


# createFirstAdmin



<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/<kuid>/_createFirstAdmin[?reset=1]` or `http://kuzzle:7512/_createFirstAdmin[?reset=1]`  
**Method:** `POST`  
**Body**
</p>
</blockquote>

```js
{
  "content": {
    "name": "John Doe", // Additional optional User properties
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
    "name": "John Doe", // Additional optional User properties
    ...
  },
  "credentials": {
    "local": {
      "username": "userAdmin", // ie: Mandatory for "local" authentication plugin
      "password": "myPassword" // ie: Mandatory for "local" authentication plugin
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
  "action": "createFirstAdmin",
  "reset": "true|false",                    
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
  "action": "createFirstAdmin",
  "reset": "true|false",                    
  "_id": "<kuid>",
  "body": {
    "content": {
      "name": "John Doe",    
    },
    "credentials": {
      "local": {
        "username": "userAdmin",   
        "password": "myPassword"   
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
  "controller": "security",
  "action": "createFirstAdmin",
  "volatile": {},
  "requestId": "<unique request identifier>",
  "result": {
    "_id": "<kuid>",                  // The kuzzle user identifier
    "_source": {
      "name": "John Doe",
      "profileIds": [
        "admin"
      ],
      ...
    }
  }
}
```

Creates the first admin `user` in Kuzzle's database layer. Does nothing if an admin user already exists.

If an `_id` is provided in the query and if the user [`<kuid>`]({{ site_base_path }}guide/kuzzle-depth/authentication/#the-kuzzle-user-identifier-kuid) already exists,
it will be replaced and its `profileIds` will be set to `["admin"]`. If not provided, the `_id` will be auto-generated.

If the optional field `reset` is set to `true` (`1` with http),
the preset roles (`anonymous` and `default`) will be reset with more restrictive rights.

Other mandatory additional information are needed in the `credentials` attribute depending on the installed authentication plugins you want to use.
