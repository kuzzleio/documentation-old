# ~ security controller

## createCredentials

<section class="http"></section>

>**URL:** `http://kuzzle:7512/credentials/<strategy>/<kuid>/_create`  
>**Method:** `POST`  
>**Body**

<section class="http"></section>

```litcoffee
{
  "credentialField": "someValue",
  ...
}

// example with a "local" authentication

{
  "username": "MyUser",
  "password": "MyPassword"
}
```

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "security",
  "action": "createCredentials",
  "strategy": "<strategy>",
  "_id": "<kuid>",                  // The kuzzle user identifier
  "body": {
    "credentialField": "someValue",
    ...
  }
}

// example with a "local" authentication

{
  "controller": "security",
  "action": "createCredentials",
  "strategy": "<strategy>",
  "_id": "<kuid>",                  // The kuzzle user identifier
  "body": {
    "username": "MyUser",
    "password": "MyPassword"
  }
}
```

>**Response**

```litcoffee
// example with a "local" authentication

{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "action": "createCredentials",
  "controller": "security",
  "_id": "<kuid>",
  "result": {
    "username": "MyUser"
  }
}
```

Create credentials of the specified `<strategy>` for the user [`<kuid>`](../guide/#the-kuzzle-user-identifier). The credentials to send depends entirely on the authentication plugin and strategy you want to create credentials for.


## createFirstAdmin

<section class="http"></section>

>**URL:** `http://kuzzle:7512/<kuid>/_createFirstAdmin[?reset=1]` or `http://kuzzle:7512/_createFirstAdmin[?reset=1]`  
>**Method:** `POST`  
>**Body**

<section class="http"></section>

```litcoffee
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
    "name": "John Doe",                   // Additional optional User properties
    ...
  },
  "credentials": {
    "local": {
      "username": "userAdmin",            // ie: Mandatory for "local" authentication plugin
      "password": "myPassword"            // ie: Mandatory for "local" authentication plugin
    }
  }
}
```

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "security",
  "action": "createFirstAdmin",
  "reset": true|false,                    // Optional. Will reset the preset roles if set to true.
  "_id": "<kuid>",                        // Optional. The kuzzle user identifier. If not provided, will be generated automatically.
  "body": {
    "content": {
      "name": "John Doe",                 // Additional optional User properties
      ...
    },
    "credentials": {
      "strategy-name": {
        ...
      }
    }
  }
}

// example with a "local" authentication

{
  "controller": "security",
  "action": "createFirstAdmin",
  "reset": true|false,                    // Optional. Will reset the preset roles if set to true.
  "_id": "<kuid>",                        // Optional. The kuzzle user identifier. If not provided, will be generated automatically.
  "body": {
    "content": {
      "name": "John Doe",                 // Additional optional User properties
      ...
    },
    "credentials": {
      "local": {
        "username": "userAdmin",          // ie: Mandatory for "local" authentication plugin
        "password": "myPassword"          // ie: Mandatory for "local" authentication plugin
      }
    }
  }
}
```

>**Response**

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
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

If an `_id` is provided in the query and if the user [`<kuid>`](../guide/#the-kuzzle-user-identifier) already exists,
it will be replaced and its `profileIds` will be set to `["admin"]`. If not provided, the `_id` will be auto-generated.

If the optional field `reset` is set to `true` (`1` with http),
the preset roles (`anonymous` and `default`) will be reset with more restrictive rights.

Other mandatory additional information are needed in the `credentials` attribute depending on the installed authentication plugins you want to use.


## createOrReplaceProfile

<section class="http"></section>

>**URL:** `http://kuzzle:7512/profiles/<profileId>`  
>**Method:** `PUT`  
>**Body**

<section class="http"></section>

```litcoffee
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

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "security",
  "action": "createOrReplaceProfile",
  "_id": "<profileId>",               // Mandatory. The id of the profile

  // the profile definition
  "body": {
    // The new array of role IDs and restrictions (cannot be empty)
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
      ...
    ]
  }
}
```

>**Response**

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
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


## createOrReplaceRole

<section class="http"></section>

>**URL:** `http://kuzzle:7512/roles/<roleId>`  
>**Method:** `PUT`  
>**Body**

<section class="http"></section>

```litcoffee
{
  "controllers": {
    "*": {
      "actions": {
        "*": true
      }
    }
  }
}
```

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "security",
  "action": "createOrReplaceRole",
  "_id": "<roleId>",                  // Mandatory. The id of the role

  // the role definition
  "body": {
    "controllers": {
      "*": {
        "actions": {
          "*": true
        }
      }
    }
  }
}
```

>**Response**

```litcoffee
{
  "status": 200,                     // Assuming everything went well
  "error": null,                     // Assuming everything went well
  "result": {
    "_id": "<roleId>",
    "_index": "%kuzzle",
    "_type": "roles",
    "_version": 1,
    "created": true,
    "_source": { // your role definition
      "controllers": {
        "*": {
          "actions": {
            "*": true
          }
        }
      }
    }
  }
  "requestId": "<unique request identifier>",
  "controller": "security",
  "action": "createOrReplaceRole",
  "volatile": {},
}
```

Validates and stores a role in Kuzzle's persistent data storage.

The body content needs to match Kuzzle's role definition.

To get more detailed information about the expected role definition or Kuzzle's user management model,
please refer to [Kuzzle's permissions documentation](../guide/#permissions).


## createProfile

<section class="http"></section>

>**URL:** `http://kuzzle:7512/profiles/<profileId>/_create`  
>**Method:** `POST`  
>**Body**

<section class="http"></section>

```litcoffee
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

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "security",
  "action": "createProfile",
  "_id": "<profileId>",               // Mandatory. The id of the profile

  // the profile definition
  "body": {
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
}
```

>**Response**

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
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


## createRole

<section class="http"></section>

>**URL:** `http://kuzzle:7512/roles/<roleId>/_create`  
>**Method:** `POST`  
>**Body**

<section class="http"></section>

```litcoffee
{
  "controllers": {
    "*": {
      "actions": {
        "*": true
      }
    }
  }
}
```

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "security",
  "action": "createRole",
  "_id": "<roleId>",                  // Mandatory. The id of the role

  // the role definition
  "body": {
    "controllers": {
      "*": {
        "actions": {
          "*": true
        }
      }
    }
  }
}
```

>**Response**

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "result": {
    "_id": "<roleId>",
    "_index": "%kuzzle",
    "_type": "roles",
    "_version": 1,
    "created": true,
    "_source": { // your role definition
      "controllers": {
        "*": {
          "actions": {
            "*": true
          }
        }
      }
    }
  }
  "requestId": "<unique request identifier>",
  "controller": "security",
  "action": "createRole",
  "volatile": {},
}
```

Validates and stores a role in Kuzzle's persistent data storage.
**Note:** The `_id` parameter is mandatory.

The body content needs to match Kuzzle's role definition.

To get more detailed information about the expected role definition or Kuzzle's user management model,
please refer to [Kuzzle's permissions documentation](../guide/#permissions).


## createUser

<section class="http"></section>

>**URL:** `http://kuzzle:7512/users/<kuid>/_create` or `http://kuzzle:7512/users/_create`  
>**Method:** `POST`  
>**Body**

<section class="http"></section>

```litcoffee
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

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "security",
  "action": "createUser",
  "_id": "<kuid>",                          // Optional. If not provided, will be generated automatically.
  "body": {
    "content": {
      "profileIds": ["<profileId>"],        // Mandatory. The profile ids for the user
      "name": "John Doe",                   // Additional optional User properties
      ...
    },
    "credentials": {
      "strategy-name": {
        ...
      }
    }
  }
}

// example with a "local" authentication

{
  "controller": "security",
  "action": "createUser",
  "_id": "<kuid>",                        // Optional. If not provided, will be generated automatically.
  "body": {
    "content": {
      "profileIds": ["<profileId>"],      // Mandatory. The profile ids for the user
      "name": "John Doe",                 // Additional optional User properties
      ...
    },
    "credentials": {
      "local": {
        "username": "MyUser"              // ie: Mandatory for "local" authentication plugin
        "password": "MyPassword"          // ie: Mandatory for "local" authentication plugin
      } 
    }
  }
}
```

>**Response**

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "index": "%kuzzle",
  "collection": "users",
  "controller": "security",
  "action": "createUser",
  "volatile": {},
  "requestId": "<unique request identifier>",
  "result": {
    "_id": "<kuid>",                  // The kuzzle user identifier
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

If an `_id` is provided in the query and if a user [`<kuid>`](../guide/#the-kuzzle-user-identifier) already exists, an error is returned.
If not provided, the `_id` will be auto-generated.

Provided profile ids are used to set the permissions of the user.

Other mandatory additional information are needed in the `credentials` attribute depending on the installed authentication plugins you want to use.


## createRestrictedUser

<section class="http"></section>

>**URL:** `http://kuzzle:7512/users/<kuid>/_createRestricted` or `http://kuzzle:7512/users/_createRestricted`  
>**Method:** `POST`  
>**Body**

<section class="http"></section>

```litcoffee
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

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "security",
  "action": "createRestrictedUser",
  "_id": "<kuid>",                          // Optional. If not provided, will be generated automatically.
  "body": {
    "content": {
      "name": "John Doe",                   // Additional optional User properties
      ...
    },
    "credentials": {
      "strategy-name": {
        ...
      }
    }
  }
}

// example with a "local" authentication

{
  "controller": "security",
  "action": "createRestrictedUser",
  "_id": "<kuid>",                        // Optional. If not provided, will be generated automatically.
  "body": {
    "content": {
      "profileIds": ["<profileId>"],      // Mandatory. The profile ids for the user
      "name": "John Doe",                 // Additional optional User properties
      ...
    },
    "credentials": {
      "local": {
        "username": "MyUser"              // ie: Mandatory for "local" authentication plugin
        "password": "MyPassword"          // ie: Mandatory for "local" authentication plugin
      } 
    }
  }
}
```

>**Response**

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
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


## deleteCredentials

<section class="http"></section>

>**URL:** `http://kuzzle:7512/credentials/<strategy>/<kuid>`  
>**Method:** `DELETE`  

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "security",
  "action": "deleteCredentials",
  "strategy": "<strategy>",
  "_id": "<kuid>"
}
```

>**Response**

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "action": "deleteCredentials",
  "controller": "security",
  "_id": "<kuid>",
  "result": {
    "acknowledged": true
  }
}
```

Delete credentials of the specified `<strategy>` for the user [`<kuid>`](../guide/#the-kuzzle-user-identifier) .


## deleteProfile

<section class="http"></section>

>**URL:** `http://kuzzle:7512/_profiles/<profileId>`  
>**Method:** `DELETE`

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "security",
  "action": "deleteProfile",

  // The profile unique identifier. It's the same you set when you create a profile.
  // in its responses when you create a profile.
  "_id": "<profileId>"
}
```

>**Response**

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "result": {
    "_id": "<profileId>"              // The profile id
  },
  "index": "%kuzzle",
  "collection": "profiles",
  "action": "deleteProfile",
  "controller": "security",
  "requestId": "<unique request identifier>"
}
```

Given a `profile id`, deletes the corresponding profile from the database. Note
that the related roles will NOT be deleted.


## deleteRole

<section class="http"></section>

>**URL:** `http://kuzzle:7512/roles/<roleId>`  
>**Method:** `DELETE`

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "security",
  "action": "deleteRole",

  // The role unique identifier. It's the same you set when you create a role.
  // in its responses when you create a role.
  "_id": "<roleId>"
}
```

>**Response**

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "result": {
    "_id": "<roleId>"                 // The role id
  }
  "index": "%kuzzle",
  "collection": "roles"
  "action": "deleteRole",
  "controller": "security",
  "requestId": "<unique request identifier>"
}
```

Given a `role id`, deletes the corresponding role from the database.


## deleteUser

<section class="http"></section>

>**URL:** `http://kuzzle:7512/users/<kuid>`  
>**Method:** `DELETE`

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "security",
  "action": "deleteUser",

  // The role unique identifier. It's the same you set when you create a user.
  // in its responses when you create a role.
  "_id": "<roleId>"
}
```

>**Response**

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "result": {
    "_id": "<kuid>",                  // The kuzzle user identifier
  }
  "index": "%kuzzle",
  "collection": "users",
  "action": "deleteUser",
  "controller": "security",
  "requestId": "<unique request identifier>"
}
```

Given a `user id`, deletes the corresponding [`<kuid>`](../guide/#the-kuzzle-user-identifier) from Kuzzle's database layer.


## getAllCredentialFields

<section class="http"></section>

>**URL:** `http://kuzzle:7512/credentials/_fields`  
>**Method:** `GET`  

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "security",
  "action": "getAllCredentialFields"
}
```

>**Response**

```litcoffee
// example with a "local" authentication

{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "action": "getAllCredentialFields",
  "controller": "security",
  "result": {
    "local": ["username", "password"],
    ...
  }
}
```

Retrieve a list of accepted fields per authentication strategy. These fields might either be required or optional.


## getCredentialFields

<section class="http"></section>

>**URL:** `http://kuzzle:7512/credentials/<strategy>/_fields`  
>**Method:** `GET`  

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "security",
  "action": "getCredentialFields",
  "strategy": "<strategy>"
}
```

>**Response**

```litcoffee
// example with a "local" authentication

{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "action": "getCredentialFields",
  "controller": "security",
  "result": ["username", "password"]
}
```

Retrieve the list of accepted field names by the specified `<strategy>`. These fields might either be required or optional.

## getCredentials

<section class="http"></section>

>**URL:** `http://kuzzle:7512/credentials/<strategy>/<kuid>`  
>**Method:** `GET`  

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "security",
  "action": "getCredentials",
  "strategy": "<strategy>",
  "_id": "<kuid>"
}
```

>**Response**

```litcoffee
// example with a "local" authentication

{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "action": "getCredentials",
  "controller": "security",
  "_id": "<kuid>",
  "result": {
    "username": "MyUser"
  }
}
```

Get credential information of the specified `<strategy>` for the user [`<kuid>`](../guide/#the-kuzzle-user-identifier). Provided information completely depend of the strategy. The result can be an empty object.


## getProfile

<section class="http"></section>

>**URL:** `http://kuzzle:7512/_profiles/<profileId>`  
>**Method:** `GET`

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "security",
  "action": "getProfile",

  // The profile unique identifier. It's the same you set when you create a profile.
  "_id": "<profileId>"
}
```

>**Response**

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "result": {
    "_id": "<profileId>",             // The profile id
    "_source": {                      // The requested profile
      ...
    },
    "index": "%kuzzle",
    "collection": "profiles"
    "action": "getProfile",
    "controller": "security",
    "requestId": "<unique request identifier>"
  }
}
```
Given a `profile id`, retrieves the corresponding profile from the database.


## getProfileMapping

<section class="http"></section>

>**URL:** `http://kuzzle:7512/profiles/_mapping`  
>**Method:** `GET`

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "security",
  "action": "getProfileMapping"
}
```

>**Response**

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "controller": "security",
  "action": "getProfileMapping",
  "requestId": "<unique request identifier>",
  "result": {
    "mapping": {
      ...
    }
  }
}
```

Gets the mapping of the internal `profiles` collection.


## getProfileRights

<section class="http"></section>

>**URL:** `http://kuzzle:7512/_profiles/<profileId>/_rights`  
>**Method:** `GET`

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "security",
  "action": "getProfileRights",

  // The profile unique identifier. It's the same you set when you create a profile.
  // in its responses when you create a profile.
  "_id": "<profileId>"
}
```

>**Response**

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "result": {
    // An array of objects containing the profile rights
    "hits": [
      {
        "controller": "<ctrl_name|*>",
        "action": "<action_name|*>",
        "index": "<index_name|*>",
        "collection": "<collection_name|*>",
        "value": "<allowed|denied|conditional>"
      },
      {
        // Another rights item... and so on
      }
    ],
}
```
Given a `profile id`, retrieves the corresponding rights.


## getRole

<section class="http"></section>

>**URL:** `http://kuzzle:7512/roles/<role id>`  
>**Method:** `GET`

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "security",
  "action": "getRole",

  // The role unique identifier. It's the same you set when you create a role.
  // in its responses when you create a role.
  "_id": "<roleId>"
}
```

>**Response**

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "result": {
    "_id": "<roleId>",                // The role id
    "_source": {
      "controllers": {
        ...
      }
    }
  },
  "index": "%kuzzle",
  "collection": "roles"
  "action": "getRole",
  "controller": "security",
  "volatile": {},
  "requestId": "<unique request identifier>"
}
```

Given a `role id`, retrieves the corresponding role from the database.


## getRoleMapping

<section class="http"></section>

>**URL:** `http://kuzzle:7512/roles/_mapping`  
>**Method:** `GET`

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "security",
  "action": "getRoleMapping"
}
```

>**Response**

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "controller": "security",
  "action": "getRoleMapping",
  "requestId": "<unique request identifier>",
  "result": {
    "mapping": {
      ...
    }
  }
}
```

Gets the mapping of the internal `roles` collection.


## getUser

<section class="http"></section>

>**URL:** `http://kuzzle:7512/users/<kuid>`  
>**Method:** `GET`

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "security",
  "action": "getUser",
  "_id": "<kuid>"
}
```

>**Response**

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "index": "<index>",
  "collection": "<collection>",
  "controller": "security",
  "action": "getUser",
  "requestId": "<unique request identifier>",
  "result": {
    "_id": "<kuid>",
    "_source": {
      "profileIds": ["<profileId>"],
      ...                             // The user object content
    }
  }
}
```


Given a user [`<kuid>`](../guide/#the-kuzzle-user-identifier), gets the matching user from Kuzzle's dabatase layer.


## getUserMapping

<section class="http"></section>

>**URL:** `http://kuzzle:7512/users/_mapping`  
>**Method:** `GET`

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "security",
  "action": "getUserMapping"
}
```

>**Response**

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "controller": "security",
  "action": "getUserMapping",
  "requestId": "<unique request identifier>",
  "result": {
    "mapping": {
      ...
    }
  }
}
```

Gets the mapping of the internal `users` collection.


## getUserRights

<section class="http"></section>

>**URL:** `http://kuzzle:7512/_users/<kuid>/_rights`  
>**Method:** `GET`

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "security",
  "action": "getUserRights",
  "_id": "<kuid>"
}
```


>**Response**

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "result": {
    // An array of objects containing the user rights
    "hits": [
      {
        "controller": "<ctrl_name|*>",
        "action": "<action_name|*>",
        "index": "<index_name|*>",
        "collection": "<collection_name|*>",
        "value": "<allowed|denied|conditional>"
      },
      {
        // Another rights item... and so on
      }
    ],
}
```
Given a `user id`, gets the matching user's rights from Kuzzle's dabatase layer.


## hasCredentials

<section class="http"></section>

>**URL:** `http://kuzzle:7512/credentials/<strategy>/<kuid>/_exists`  
>**Method:** `GET`  

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "security",
  "action": "hasCredentials",
  "strategy": "<strategy>",
  "_id": "<kuid>"
}
```

>**Response**

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "action": "hasCredentials",
  "controller": "security",
  "_id": "<kuid>",
  "result": true
}
```

Check the existence of the specified `<strategy>`'s credentials for the user [`<kuid>`](../guide/#the-kuzzle-user-identifier).


## mDeleteProfiles

<section class="http"></section>

>**URL:** `http://kuzzle:7512/profiles/_mDelete`  
>**Method:** `POST`  
>**Body:**

<section class="http"></section>

```litcoffee
{
  // ids must be an array of profile ids
  "ids": ["myFirstProfile", "mySecondProfile"]
}
```

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "security",
  "action": "mDeleteProfiles",
  "body": {
    // ids must be an array of profile ids
    "ids": ["myFirstProfile", "mySecondProfile"]
  }
}
```

>**Response**

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "action": "mDeleteProfiles",
  "controller": "security",
  "requestId": "<unique request identifier>",
  "result": [
    "myFirstProfile",
    "mySecondProfile"
  ]
}
```

Deletes a list of `profile` objects from Kuzzle's database layer given a list of profile ids.

## mDeleteRoles

<section class="http"></section>

>**URL:** `http://kuzzle:7512/roles/_mDelete`  
>**Method:** `POST`  
>**Body:**

<section class="http"></section>

```litcoffee
{
  // ids must be an array of profile ids
  "ids": ["myFirstRole", "mySecondRole"]
}
```

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "security",
  "action": "mDeleteRoles",
  "body": {
    // ids must be an array of profile ids
    "ids": ["myFirstRole", "mySecondRole"]
  }
}
```

>**Response**

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "action": "mDeleteRoles",
  "controller": "security",
  "requestId": "<unique request identifier>",
  "result": [
    "myFirstRole",
    "mySecondRole"
  ]
}
```

Deletes a list of `roles` objects from Kuzzle's database layer given a list of role ids.

## mDeleteUsers

<section class="http"></section>

>**URL:** `http://kuzzle:7512/users/_mDelete`  
>**Method:** `POST`  
>**Body:**

<section class="http"></section>

```litcoffee
{
  // ids must be an array of profile ids
  "ids": ["firstKuid", "secondKuid"]
}
```

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "security",
  "action": "mDeleteUsers",
  "body": {
    // ids must be an array of kuids
    "ids": ["firstKuid", "secondKuid"]
  }
}
```

>**Response**

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "action": "mDeleteUsers",
  "controller": "security",
  "requestId": "<unique request identifier>",
  "result": [
    "firstKuid",
    "secondKuid"
   ]
  }
}
```

Deletes a list of `users` objects from Kuzzle's database layer given a list of [`<kuids>`](../guide/#the-kuzzle-user-identifier).

## mGetProfiles

<section class="http"></section>

>**URL:** `http://kuzzle:7512/profiles/_mGet`  
>**Method:** `POST`  
>**Body:**

<section class="http"></section>

```litcoffee
{
  // ids must be an array of profile ids
  "ids": ["firstProfileId", "secondProfileId"]
}
```

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "security",
  "action": "mGetProfiles",
  "body": {
    // ids must be an array of profile ids
    "ids": ["firstProfileId", "secondProfileId"]
  }
}
```

>**Response**

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "index": "%kuzzle",
  "collection": "profiles"
  "action": "mGetProfiles",
  "controller": "security",
  "requestId": "<unique request identifier>",
  "result": {
     "_shards": {
       "failed": 0,
       "successful": 5,
       "total": 5
     },
     "hits": [
       {
         "_id": "firstProfileId",
         "_index": "%kuzzle",
         "_score": 1,
         "_source": {
           "policies": [
             // Policies associated to the profile
           ]
         },
         "_type": "profiles"
       },
       {
         "_id": "secondProfileId",
         "_index": "%kuzzle",
         "_score": 1,
         "_source": {
           "policies": [
             // Policies associated to the profile
           ]
         },
         "_type": "profiles"
       }
     ],
     "max_score": null,
     "timed_out": false,
     "took": 1,
     "total": 2
  }
}
```

Retrieves a list of `profile` objects from Kuzzle's database layer given a list of profile ids.


## mGetRoles

<section class="http"></section>

>**URL:** `http://kuzzle:7512/roles/_mGet`  
>**Method:** `POST`  
>**Body:**

<section class="http"></section>

```litcoffee
{
  // ids must be an array of role id
  "ids": ["firstRoleId", "secondRoleId"]
}
```

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "security",
  "action": "mGetRoles",
  "body": {
    // ids must be an array of role id
    "ids": ["firstRoleId", "secondRoleId"]
  }
}
```

>**Response**

```litcoffee
{
  "action": "mGetRoles",
  "collection": "roles",
  "controller": "security",
  "error": null,
  "index": "%kuzzle",
  "volatile": {},
  "requestId": "<unique request identifier>",
  "result": {
     "_shards": {
       "failed": 0,
       "successful": 5,
       "total": 5
     },
     "hits": [
       {
         "_id": "firstRoleId",
         "_index": "%kuzzle",
         "_score": 1,
         "_source": {
           "controllers": {
             // Rights for each controllers and actions can be found here
           }
         },
         "_type": "roles"
       },
       {
         "_id": "secondRoleId",
         "_index": "%kuzzle",
         "_score": 1,
         "_source": {
           "controllers": {
             // Rights for each controllers and actions can be found here
           }
         },
         "_type": "roles"
       }
     ],
     "max_score": null,
     "timed_out": false,
     "took": 1,
     "total": 2
  },
  "status": 200
}
```

Retrieves a list of `role` objects from Kuzzle's database layer given a list of role ids.

## scrollProfiles

<section class="http"></section>

>**URL:** `http://kuzzle:7512/profiles/_scroll/<scrollId>[?scroll=<time to live>]`  
>**Method:** `GET`

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "security",
  "action": "scrollProfiles",
  "scrollId": "<scrollId>",

  // Optional: new time to live of the cursor
  "scroll": "<time to live>"
  }
}
```

>**Response**

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "action": "scrollProfiles",
  "controller": "security",
  "requestId": "<unique request identifier>",
  "result": {
    // scroll requests may return a new scroll identifier
    // only the most recent scrollId should be used
    "scrollId": "<new scroll id>",

    // An array of objects containing your retrieved documents
    "hits": [
      {
        "_id": "firstProfileId",
        "_source": {
          "policies": [
            {
              "roleId": "firstRoleId",
              "restrictedTo": [
                ...
              ]
            },
            ...
          ]
        }
      },
      {
        ...
      }
    ],
    "total": <number of found profiles>
  }
}
```

This method moves forward a result set cursor created by a [`searchProfiles` query](#searchprofiles) with the `scroll` argument provided.

The response may contain a *different* cursor identifier, pointing to the next page of results.

The optional `scroll` argument allows to refresh the cursor duration, with a new [time to live](https://www.elastic.co/guide/en/elasticsearch/reference/current/common-options.html#time-units) value.

<aside class="warning">
  The results that are returned from a `scrollProfiles` request reflect the state of the index at the time
  that the initial search request was made, like a snapshot in time. Subsequent changes
  to documents (index, update or delete) will only affect later search requests.
</aside>

## scrollUsers

<section class="http"></section>

>**URL:** `http://kuzzle:7512/users/_scroll/<scrollId>[?scroll=<time to live>]`  
>**Method:** `GET`

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "security",
  "action": "scrollUsers",
  "scrollId": "<scrollId>",

  // Optional: new time to live of the cursor
  "scroll": "<time to live>"
  }
}
```

>**Response**

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "action": "scrollUsers",
  "controller": "security",
  "requestId": "<unique request identifier>",
  "result": {
    // scroll requests may return a new scroll identifier
    // only the most recent scrollId should be used
    "scrollId": "<new scroll id>",

    // An array of objects containing your retrieved documents
    "hits": [
      {
        "_id": "<firstKuid>",
        "_source": { ... }             // The user object content
      },
      {
        ...
      }
    ],
    "total": <number of found users>
  }
}
```

This method moves forward a result set cursor created by a [`searchUsers` query](#searchusers) with the `scroll` argument provided.

The response may contain a *different* cursor identifier, pointing to the next page of results.

The optional `scroll` argument allows to refresh the cursor duration, with a new [time to live](https://www.elastic.co/guide/en/elasticsearch/reference/current/common-options.html#time-units) value.

<aside class="warning">
  The results that are returned from a `scrollUsers` request reflect the state of the index at the time
  that the initial search request was made, like a snapshot in time. Subsequent changes
  to documents (index, update or delete) will only affect later search requests.
</aside>


## searchProfiles

<section class="http"></section>

>**URL:** `http://kuzzle:7512/profiles/_search[?from=0][&size=42][&scroll=<time to live>]`  
>**Method:** `POST`  
>**Body**

<section class="http"></section>

```litcoffee
{
  // A roles array containing a list of role Ids can be added
  "roles": [
    "firstRoleId",
    "admin"
  ]
}
```

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "security",
  "action": "searchProfiles",
  "body": {
    // A roles array containing a list of roleIds can be added
    "policies": [
      "myRoleId",
      "admin"
    ]
  },

  // Optional arguments
  "from": 0,
  "size": 42,
  "scroll": "<time to live>"
}
```

>**Response**

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "result":
  {
    "_shards": {
      "failed": 0,
      "successful": 5,
      "total": 5
    },
    "hits": [
      {
        "_id": "firstProfileId",
        "_source": {
          "policies": [
            {
              "roleId": "firstRoleId",
              "restrictedTo": [
                ...
              ]
            },
            ...
          ]
        }
      },
      {
        "_id": "secondProfileId",
        "_source": {
          "policies": [
            {
              "roleId": "admin"
            },
            ...
          ]
        }
      }
    ],
    "total": 2
  },
  "index": "%kuzzle",
  "collection": "profiles"
  "action": "searchProfiles",
  "controller": "security",
  "requestId": "<unique request identifier>"
}
```

Retrieves profiles referring to a given set of roles in their policies.


Optional arguments:

* `body.policies` contains an array of role identifiers used to filters the search results
* `size` controls the maximum number of documents returned in the response
* `from` is usually used with the `size` argument, and defines the offset from the first result you want to fetch
* `scroll` allows to fetch large result sets, and it must be set with a [time duration](https://www.elastic.co/guide/en/elasticsearch/reference/current/common-options.html#time-units). If set, a forward-only cursor will be created (and automatically destroyed at the end of the set duration), and its identifier will be returned in the `scrollId` property, along with the first page of results. This cursor can then be moved forward using the [`scrollProfiles` API action](#scrollprofiles)

## searchRoles

<section class="http"></section>

>**URL:** `http://kuzzle:7512/roles/_search[?from=0][&size=42]`  
>**Method:** `POST`  
>**Body:**

<section class="http"></section>

```litcoffee
{
  // indexes must be an array of controllers
  "controllers": ["aController", "anotherController"]
}
```

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "security",
  "action": "searchRoles",
  "body": {
    "controllers": ["aController", "anotherController"]
    // "from" and "size" argument for pagination
    "from": 0,
    "size": 42
  }
}
```

>**Response**

```litcoffee
{
  "action": "searchRoles",
  "collection": "roles",
  "controller": "security",
  "error": null,
  "index": ""%kuzzle",
  "volatile": {},
  "requestId": "<unique request identifier>",
  "result":
  {
     "_shards": {
       "failed": 0,
       "successful": 5,
       "total": 5
     },
     "hits": [
       {
         "_id": "<roleId>",
         "_index": "%kuzzle",
         "_score": 1,
         "_source": {
           "controllers": {
             // Rights for each controllers and actions can be found here
           }
         },
         "_type": "roles"
       }
     ],
     "max_score": null,
     "timed_out": false,
     "took": 1,
     "total": 1
  },
  "status": 200
}
```

Retrieves all roles with rights defined for given `indexes`.

Attribute `indexes` in body is optional.

The `from` and `size` arguments allow pagination.

Available filters:

| Filter | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``indexes`` | array | List of indexes id related to the searched role | ``undefined`` |


## searchUsers

<section class="http"></section>

>**URL:** `http://kuzzle:7512/users/_search[?from=0][&size=42][&scroll=<time to live>]`  
>**Method:** `POST`  
>**Body**

<section class="http"></section>

```litcoffee
{
  "filter": {
    "and": [
      {
        "in": {
          "profileId": ["anonymous", "default"],
        }
      },
      {
        "geo_distance": {
          "distance": "10km",
          "pos": {
            "lat": "48.8566140",
            "lon": "2.352222"
          }
        }
      }
    ]
  }
}
```

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "security",
  "action": "searchUsers",
  "body": {
    "filter": { // If empty or missing, Kuzzle will return all users.
      "and": [
        {
          "in": {
            "profileId": [
              "anonymous",
              "default"
            ],
          }
        },
        {
          "geo_distance": {
            "distance": "10km",
            "pos": {
              "lat": "48.8566140",
              "lon": "2.352222"
            }
          }
        }
      ]
    }
  },

  // Optional arguments
  "from": 0,
  "size": 10,
  "scroll": "<time to live>"
}
```

>**Response**

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "index": "%kuzzle",
  "collection": "users",
  "action": "search",
  "controller": "security",
  "requestId": "<unique request identifier>",
  "result": {
    "total": <total number of users matching the filter>,
    // An array of user objects
    "hits": [
      {
        "_id": "<kuid>",
        "_source": { ... }             // The user object content
      },
      {
        ...
      }
    ]
  }
}
```

Retrieves users matching the provided filter.

Optional arguments:

* `size` controls the maximum number of documents returned in the response
* `from` is usually used with the `size` argument, and defines the offset from the first result you want to fetch
* `scroll` allows to fetch large result sets, and it must be set with a [time duration](https://www.elastic.co/guide/en/elasticsearch/reference/current/common-options.html#time-units). If set, a forward-only cursor will be created (and automatically destroyed at the end of the set duration), and its identifier will be returned in the `scrollId` property, along with the first page of results. This cursor can then be moved forward using the [`scrollUsers` API action](#scrollusers)

## updateCredentials

<section class="http"></section>

>**URL:** `http://kuzzle:7512/credentials/<strategy>/<kuid>/_update`  
>**Method:** `PUT`  
>**Body**

<section class="http"></section>

```litcoffee
{
  "credentialField": "someValue",
  ...
}

// example with a "local" authentication

{
  "password": "MyPassword"
}
```

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "security",
  "action": "updateCredentials",
  "strategy": "<strategy>",
  "_id": "<kuid>",
  "body": {
    "credentialField": "someValue",
    ...
  }
}

// example with a "local" authentication

{
  "controller": "security",
  "action": "updateCredentials",
  "strategy": "<strategy>",
  "_id": "<kuid>",
  "body": {
    "password": "MyPassword"
  }
}
```

>**Response**

```litcoffee
// example with a "local" authentication

{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "action": "updateCredentials",
  "controller": "security",
  "_id": "<kuid>",
  "result": {
    "username": "MyUser"
  }
}
```

Updates credentials of the specified `<strategy>` for the user [`<kuid>`](../guide/#the-kuzzle-user-identifier). The credentials to send depends entirely on the authentication plugin and strategy you want to create credentials for.


## updateProfile

<section class="http"></section>

>**URL:** `http://kuzzle:7512/profiles/<profileId>/_update`  
>**Method:** `PUT`  
>**Body**

<section class="http"></section>

```litcoffee
{
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

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "security",
  "action": "updateProfile",
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
      ...
    ]
  }
}
```

>**Response**

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "index": "%kuzzle",
  "collection": "profiles",
  "action": "updateProfile",
  "controller": "security",
  "requestId": "<unique request identifier>",
  "result": {
    "_id": "<profileId>",
    "_index": "%kuzzle",
    "_type": "profiles",
    "_version": 2
  }
}
```

Given a `profileId`, updates the matching Profile object in Kuzzle's database layer.


## updateProfileMapping

<section class="http"></section>

>**URL:** `http://kuzzle:7512/profiles/_mapping`  
>**Method:** `PUT`  
>**Body:**

<section class="http"></section>

```litcoffee
{
  // Data mapping using ElasticSearch mapping syntax
  "properties": {
    "field1": {
      "type": "field type",
      "other": "...options..."
    },
    "field2": {
      "type": "field type",
      "other": "...options..."
    },
    ...
    "fieldn": {
      "type": "field type",
      "other": "...options..."
    }
  }
}
```

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "security",
  "action": "updateProfileMapping",

  // Data mapping using ElasticSearch mapping syntax
  "body": {
    "properties": {
      "field1": {
        "type": "field type",
        "other": "...options..."
      },
      "field2": {
        "type": "field type",
        "other": "...options..."
      },
      ...
      "fieldn": {
        "type": "field type",
        "other": "...options..."
      }
    }
  }
}
```

>**Response**

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "action": "updateProfileMapping",
  "controller": "security",
  "requestId": "<unique request identifier>",
  "result": {
    "acknowledged": true
  },
}
```

At the first initialization, Kuzzle defines a default mapping for the `profiles` internal collection in the persistent data storage layer.

This mapping is intended to store the basic information of a profile; typically, its policies (roles and restrictions).

But if you want to store more information about your profiles, Kuzzle's API offers a way to update the `profiles` data mapping using the
[mapping capabilities of ElasticSearch](https://www.elastic.co/guide/en/elasticsearch/reference/5.x/mapping.html).


## updateRole

<section class="http"></section>

>**URL:** `http://kuzzle:7512/roles/<roleId>/_update`  
>**Method:** `PUT`  
>**Body**

<section class="http"></section>

```litcoffee
{
  "controllers": {
    "*": {
      "actions": {
        "*": true
      }
    }
  }
}
```

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "security",
  "action": "updateRole",
  "_id": "<roleId>",
  "body": {
    "controllers": {
      "*": {
        "actions": {
          "*": true
        }
      }
    }
  }
}
```

>**Response**

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "index": "%kuzzle",
  "collection": "roles",
  "action": "updateRole",
  "controller": "security",
  "requestId": "<unique request identifier>",
  "result": {
    "_id": "<roleId>",
    "_index": "%kuzzle",
    "_type": "roles",
    "_version": 2
  }
}
```

Given a `role id`, updates the matching Role object in Kuzzle's database layer.

The body content needs to match Kuzzle's role definition.

<aside class="warning">
Unlike a regular document update, this method will replace the whole role definition by the body content.<br>
In other words, you always need to provide the complete role definition in the body.
</aside>
To get some more detailed information on the expected role definition, please refer to
[Kuzzle's role reference definition documentation](https://github.com/kuzzleio/kuzzle/blob/beta/docs/security/roles-reference.md).

To get some more detailed information about Kuzzle's user management model,
please refer to [Kuzzle's security documentation](../guide/#permissions).


## updateRoleMapping

<section class="http"></section>

>**URL:** `http://kuzzle:7512/roles/_mapping`  
>**Method:** `PUT`  
>**Body:**

<section class="http"></section>

```litcoffee
{
  // Data mapping using ElasticSearch mapping syntax
  "properties": {
    "field1": {
      "type": "field type",
      "other": "...options..."
    },
    "field2": {
      "type": "field type",
      "other": "...options..."
    },
    ...
    "fieldn": {
      "type": "field type",
      "other": "...options..."
    }
  }
}
```

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "security",
  "action": "updateRoleMapping",

  // Data mapping using ElasticSearch mapping syntax
  "body": {
    "properties": {
      "field1": {
        "type": "field type",
        "other": "...options..."
      },
      "field2": {
        "type": "field type",
        "other": "...options..."
      },
      ...
      "fieldn": {
        "type": "field type",
        "other": "...options..."
      }
    }
  }
}
```

>**Response**

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "action": "updateRoleMapping",
  "controller": "security",
  "requestId": "<unique request identifier>",
  "result": {
    "acknowledged": true
  },
}
```

At the first initialization, Kuzzle defines a default mapping for the `roles` internal collection in the persistent data storage layer.

This mapping is intended to store the basic information of a role; typically, its allowed controllers and actions.

But if you want to store more information about your roles, Kuzzle's API offers a way to update the `roles` data mapping using the
[mapping capabilities of ElasticSearch](https://www.elastic.co/guide/en/elasticsearch/reference/5.x/mapping.html).


## updateUser

<section class="http"></section>

>**URL:** `http://kuzzle:7512/users/<kuid>/_update`  
>**Method:** `PUT`  
>**Body**

<section class="http"></section>

```litcoffee
{
    "foo": "bar",                    // Some properties to update
    "name": "Walter Smith",
    ...
}
```

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "security",
  "action": "updateUser",
  "_id": "<kuid>",
  "body": {
    "foo": "bar",                    // Some properties to update
    "name": "Walter Smith",
    ...
  }
}
```

>**Response**

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "index": "%kuzzle",
  "collection": "users",
  "action": "updateUser",
  "controller": "security",
  "requestId": "<unique request identifier>",
  "result": {
    "_id": "<kuid>",
    "_index": "%kuzzle",
    "_type": "users",
    "_version": 2
  }
}
```

Given a [`<kuid>`](../guide/#the-kuzzle-user-identifier), updates the matching User object in Kuzzle's database layer.


## updateUserMapping

<section class="http"></section>

>**URL:** `http://kuzzle:7512/users/_mapping`  
>**Method:** `PUT`  
>**Body:**

<section class="http"></section>

```litcoffee
{
  // Data mapping using ElasticSearch mapping syntax
  "properties": {
    "field1": {
      "type": "field type",
      "other": "...options..."
    },
    "field2": {
      "type": "field type",
      "other": "...options..."
    },
    ...
    "fieldn": {
      "type": "field type",
      "other": "...options..."
    }
  }
}
```

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "security",
  "action": "updateUserMapping",

  // Data mapping using ElasticSearch mapping syntax
  "body": {
    "properties": {
      "field1": {
        "type": "field type",
        "other": "...options..."
      },
      "field2": {
        "type": "field type",
        "other": "...options..."
      },
      ...
      "fieldn": {
        "type": "field type",
        "other": "...options..."
      }
    }
  }
}
```

>**Response**

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "action": "updateUserMapping",
  "controller": "security",
  "requestId": "<unique request identifier>",
  "result": {
    "acknowledged": true
  },
}
```

At the first initialization, Kuzzle defines a default mapping for the `users` internal collection in the persistent data storage layer.

This mapping is intended to store the basic information of a user; typically, its credentials and profiles.

But if you want to store more information about your users, Kuzzle's API offers a way to update the `users` data mapping using the
[mapping capabilities of ElasticSearch](https://www.elastic.co/guide/en/elasticsearch/reference/2.3/mapping.html).


## validateCredentials

<section class="http"></section>

>**URL:** `http://kuzzle:7512/credentials/<strategy>/<kuid>/_validate`  
>**Method:** `POST`  
>**Body**

<section class="http"></section>

```litcoffee
{
  "credentialField": "someValue",
  ...
}

// example with a "local" authentication

{
  "username": "MyUser",
  "password": "MyPassword"
}
```

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "security",
  "action": "validateCredentials",
  "strategy": "<strategy>",
  "_id": "<kuid>",
  "body": {
    "credentialField": "someValue",
    ...
  }
}

// example with a "local" authentication

{
  "controller": "security",
  "action": "validateCredentials",
  "strategy": "<strategy>",
  "_id": "<kuid>",
  "body": {
    "username": "MyUser",
    "password": "MyPassword"
  }
}
```

>**Response**

```litcoffee
// example with a "local" authentication

{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "action": "validateCredentials",
  "controller": "security",
  "_id": "<kuid>",
  "result": {
    "username": "MyUser"
  }
}
```

Validate credentials of the specified `<strategy>` for the user [`<kuid>`](../guide/#the-kuzzle-user-identifier). `result` is true if provided credentials are valid; an error is triggered otherwise. This route does not actually create or modify the user credentials. The credentials to send depends entirely on the authentication plugin and strategy you want to create credentials for.
