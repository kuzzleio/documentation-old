---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: createRestrictedUser
---


# createRestrictedUser

{{{since "1.0.0"}}}


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

// example with the "local" authentication strategy

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

Creates a new `user` in Kuzzle, with a preset list of profiles.  
The list of profiles is fixed, and needs to be configured in [Kuzzle configuration file]({{ site_base_path }}guide/essentials/configuration/) (see `security.restrictedProfileIds` in `.kuzzlerc.sample`).

Correctly configured, this route allows users with limited rights to create other accounts, without risk for them to create accounts with unwanted privileges (e.g. an anonymous user creating his own account to register on an application).

If a `user` already exists with the provided `_id`, an error is returned.  
If not provided, the `_id` will be auto-generated.

Other required information may be needed in the `credentials` attribute. Consult the corresponding authentication strategy plugin documentation for more information.
