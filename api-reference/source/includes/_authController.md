# ~ auth controller


## checkToken

<section class="http"></section>

>**URL:** `http://kuzzle:7512/_checkToken`  
>**Method:** `POST`  
>**Body:**

<section class="http"></section>

```litcoffee
{
  "token": "..."
}
```

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "auth",
  "action": "checkToken",
  "body": {
    "token": "..."
  }
}
```

>**Response**

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "controller": "auth",
  "action": "checkToken",
  "requestId": "<unique request identifier>",
  "result": {
    "valid": <boolean>,

    // if "valid" is false, contains the reason why the provided token is
    // invalid.
    // This field is not present if "valid" is true.
    "state": "Error message",

    // if "valid" is true, contains the expiration timestamp.
    // This field is not present if "valid" is false.
    "expiresAt": <timestamp>
  }
}
```

Checks a JWT Token validity.
This API route does not require to be logged in.


## createMyCredentials

<section class="http"></section>

>**URL:** `http://kuzzle:7512/credentials/<strategy>/_me/_create`  
>**Method:** `POST`  
>**Headers:** `Authorization: "Bearer <encrypted_jwt_token>"`  
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
  "controller": "auth",
  "action": "createMyCredentials",
  "strategy": "<strategy>",
  "jwt": "<encrypted_jwt_token>",
  "body": {
    "credentialField": "someValue",
    ...
  }
}

// example with a "local" authentication

{
  "controller": "auth",
  "action": "createMyCredentials",
  "strategy": "<strategy>",
  "jwt": "<encrypted_jwt_token>",
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
  "action": "createMyCredentials",
  "controller": "auth",
  "result": {
    "username": "MyUser"
  }
}
```

Create credentials of the specified `<strategy>` for the current user. The credentials to send depends entirely on the authentication plugin and strategy you want to create credentials for.


## deleteMyCredentials

<section class="http"></section>

>**URL:** `http://kuzzle:7512/credentials/<strategy>/_me`  
>**Method:** `DELETE`  
>**Headers:** `Authorization: "Bearer <encrypted_jwt_token>"`

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "auth",
  "action": "deleteMyCredentials",
  "strategy": "<strategy>",
  "jwt": "<encrypted_jwt_token>"
}
```

>**Response**

```litcoffee

{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "action": "deleteMyCredentials",
  "controller": "auth",
  "result": {
    "acknowledged": true
  }
}
```

Delete credentials of the specified `<strategy>` for the current user. If the credentials that generated the current JWT are removed, the user will remain logged in until he logs out or his session expires, but won't be able to log in with these credentials afterward.


## getCurrentUser

<section class="http"></section>

>**URL:** `http://kuzzle:7512/users/_me`  
>**Method:** `GET`  
>**Headers:** `Authorization: "Bearer <encrypted_jwt_token>"`

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "auth",
  "action": "getCurrentUser",
  "jwt": "<encrypted_jwt_token>"
}
```

>**Response**

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "controller": "auth",
  "action": "getCurrentUser",
  "requestId": "<unique request identifier>",
  "result": {
    "_id":"<userId>",
    "_source": {
      "name": {
        "first": "Steve",
        "last": "Wozniak"
      },
      ...                         // The user object content
      "profile": {
        "_id":"<profileId>",
        "roles": [
          ...                     // Users roles definitions
        ]
      }
    }
  }
}
```

Gets the user object identified by the `JSON Web Token` provided in the query or the `Authorization` header.


## getMyCredentials

<section class="http"></section>

>**URL:** `http://kuzzle:7512/credentials/<strategy>/_me`  
>**Method:** `GET`  
>**Headers:** `Authorization: "Bearer <encrypted_jwt_token>"`

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "auth",
  "action": "getMyCredentials",
  "strategy": "<strategy>",
  "jwt": "<encrypted_jwt_token>"
}
```

>**Response**

```litcoffee
// example with a "local" authentication

{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "action": "getMyCredentials",
  "controller": "auth",
  "result": {
    "username": "MyUser"
  }
}
```

Get credential information of the specified `<strategy>` for the current user. Provided information completely depend of the strategy. The result can be an empty object.


## getMyRights

<section class="http"></section>

>**URL:** `http://kuzzle:7512/users/_me/_rights`  
>**Method:** `GET`  
>**Headers:** `Authorization: "Bearer <encrypted_jwt_token>"`

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "auth",
  "action": "getMyRights",
  "jwt": "<encrypted_jwt_token>"
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

Gets the rights of the user identified by the `JSON Web Token` provided in the query or the `Authorization` header.


## credentialsExist

<section class="http"></section>

>**URL:** `http://kuzzle:7512/credentials/<strategy>/_me/_exists`  
>**Method:** `GET`  
>**Headers:** `Authorization: "Bearer <encrypted_jwt_token>"`

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "auth",
  "action": "credentialsExist",
  "strategy": "<strategy>",
  "jwt": "<encrypted_jwt_token>"
}
```

>**Response**

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "action": "credentialsExist",
  "controller": "auth",
  "result": true
}
```

Check the existence of the specified `<strategy>`'s credentials for the current user.


## login

<section class="http"></section>

>**URL:** `http://kuzzle:7512/_login`  
>**Method:** `POST`  
>**Body:**

<section class="http"></section>

```litcoffee
{
  // authentication strategy identifier (optional : kuzzle will use the "local" strategy if not set)
  "strategy": "<passportjs_strategy>",

  // JWT expiration delay (optional - kuzzle will use server default value if not set)
  //   - if this option is a raw number (not enclosed between quotes), then
  //     it represents the expiration delay in milliseconds
  //   - if this option is a string, then its content is parsed by the "ms" library
  //     For instance: "6d" (6 days), "10h" (10 hours), ...
  //     (see https://www.npmjs.com/package/ms for the complete list of accepted
  //      formats)
  "expiresIn": "<expiresIn>",

  // set of parameters depending of the chosen strategy. Example for "local" strategy:
  "username": "<username>",
  "password": "<password>"
}
```

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "auth",
  "action": "login",

  "body": {
    // authentication strategy identifier (optional - kuzzle will use the "local" strategy if not set)
    "strategy": "<passportjs_strategy>",

    // JWT expiration delay (optional - kuzzle will use server default value if not set)
    //   - if this option is a raw number (not enclosed between quotes), then
    //     it represents the expiration delay in milliseconds
    //   - if this option is a string, then its content is parsed by the "ms" library
    //     For instance: "6d" (6 days), "10h" (10 hours), ...
    //     (see https://www.npmjs.com/package/ms for the complete list of accepted
    //      formats)
    "expiresIn": "<expiresIn>",

    // set of parameters depending of the chosen strategy. Example for "local" strategy:
    "username": "<username>",
    "password": "<password>"
  }
}
```

>**Response**

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "controller": "auth",
  "action": "login",
  "requestId": "<unique request identifier>",
  "volatile": {},
  "result": {
    "_id": "<userId>",
    "jwt": "<JWT encrypted token>"
  }
}
```

Authenticates a user with a defined **passportjs** authentication strategy.
See [passportjs.org](http://www.passportjs.org/) for more details about authentication strategies.

Strategies are implemented as [plugins](https://github.com/kuzzleio/kuzzle/blob/master/docs/plugins.md).
The default "local" strategy is enabled by default
(see [kuzzle-plugin-auth-passport-local](https://github.com/kuzzleio/kuzzle-plugin-auth-passport-local)),
and let you authenticate with a login and password.

The **_login** action returns an encrypted JWT token, that must then be sent within the [requests headers](#authorization-header).


## logout

<section class="http"></section>

>**URL:** `http://kuzzle:7512/_logout`  
>**Method:** `GET`  
>**Headers:** `Authorization: "Bearer <encrypted_jwt_token>"`

<section class="others"></section>

>**Query**

<section class="others"></section>

```litcoffee
{
  "controller": "auth",
  "action": "logout",
  "jwt": "<encrypted_jwt_token>"
}
```

Revokes the token validity & unsubscribe from registered rooms.

The **_logout** action doesn't take strategy.


## updateMyCredentials

<section class="http"></section>

>**URL:** `http://kuzzle:7512/credentials/<strategy>/_me/_update`  
>**Method:** `PUT`  
>**Headers:** `Authorization: "Bearer <encrypted_jwt_token>"`  
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
  "controller": "auth",
  "action": "updateMyCredentials",
  "strategy": "<strategy>",
  "jwt": "<encrypted_jwt_token>",
  "body": {
    "credentialField": "someValue",
    ...
  }
}

// example with a "local" authentication

{
  "controller": "auth",
  "action": "updateMyCredentials",
  "strategy": "<strategy>",
  "jwt": "<encrypted_jwt_token>",
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
  "action": "updateMyCredentials",
  "controller": "auth",
  "result": {
    "username": "MyUser"
  }
}
```

Create credentials of the specified `<strategy>` for the current user. The credentials to send depends entirely on the authentication plugin and strategy you want to create credentials for.


## validateMyCredentials

<section class="http"></section>

>**URL:** `http://kuzzle:7512/credentials/<strategy>/_me/_validate`  
>**Method:** `POST`  
>**Headers:** `Authorization: "Bearer <encrypted_jwt_token>"`  
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
  "controller": "auth",
  "action": "validateMyCredentials",
  "strategy": "<strategy>",
  "jwt": "<encrypted_jwt_token>",
  "body": {
    "credentialField": "someValue",
    ...
  }
}

// example with a "local" authentication

{
  "controller": "auth",
  "action": "validateMyCredentials",
  "strategy": "<strategy>",
  "jwt": "<encrypted_jwt_token>",
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
  "action": "validateMyCredentials",
  "controller": "auth",
  "result": true
}
```

Validate credentials of the specified `<strategy>` for the current user. `result` is true if provided credentials are valid; an error is triggered otherwise. This route does not actually create or modify the user credentials. The credentials to send depends entirely on the authentication plugin and strategy you want to create credentials for.


## updateSelf

<section class="http"></section>

>**URL:** `http://kuzzle:7512/_updateSelf`  
>**Method:** `PUT`  
>**Headers:** `Authorization: "Bearer <encrypted_jwt_token>"`  
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
  "controller": "auth",
  "action": "updateSelf",
  "jwt": "<encrypted_jwt_token>",
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
  "action": "updateSelf",
  "controller": "auth",
  "volatile": {},
  "requestId": "<unique request identifier>",
  "result": {
    "_id": "<userId>",
    "_source": {
      "foo": "bar",
      "name": "Walter Smith",
      ....
    }
  }
}
```

Updates the current User object in Kuzzle's database layer.

<aside class="notice">
  User must be connected in order to perform this action.
  The current user can not update its profile using this action.
  <a href="#updateuser">Security / updateUser</a> must be used instead.
</aside>
