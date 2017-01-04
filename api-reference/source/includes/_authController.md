# ~ auth controller


## checkToken

<section class="http"></section>

>**URL:** `http://kuzzle:7511/_checkToken`  
>**Method:** `POST`  
>**Body:**

<section class="http"></section>

```litcoffee
{
  "token": "..."
}
```

<section class="others"></section>

>Query

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

>Response

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


## getCurrentUser

<section class="http"></section>

>**URL:** `http://kuzzle:7511/users/_me`  
>**Method:** `GET`  
>**Headers:** `Authorization: "Bearer <encrypted_jwt_token>"`

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "auth",
  "action": "getCurrentUser"
}
```

>Response

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "index": "<index>",
  "collection": "<collection>",
  "controller": "auth",
  "action": "getCurrentUser",
  "requestId": "<unique request identifier>",
  "jwt": "<encrypted_jwt_token>",
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


## getMyRights

<section class="http"></section>

>**URL:** `http://kuzzle:7511/users/_me/_rights`  
>**Method:** `GET`  
>**Headers:** `Authorization: "Bearer <encrypted_jwt_token>"`

<section class="others"></section>

>Query

<section class="websocket"></section>

```litcoffee
{
  "controller": "auth",
  "action": "getMyRights"
}
```

>Response

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "jwt": "<encrypted_jwt_token>",
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


## login

<section class="http"></section>

>**URL:** `http://kuzzle:7511/_login`  
>**Method:** `POST`  
>**Body:**

<section class="http"></section>

```litcoffee
{
  // authentication strategy identifier (optionnal : kuzzle will use "local" strategy if not set)
  "strategy": "<passportjs_strategy>",

  // jwt token expiration time (optional - kuzzle will use server default value if not set)
  // expressed in seconds or a string describing a time span. Eg: 60, "2 days", "10h", "7d", "1y"
  "expiresIn": "<expiresIn>",

  // set of parameters depending of the chosen strategy. Example for "local" strategy:
  "username": "<username>",
  "password": "<password>"
}
```

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "auth",
  "action": "login",

  "body": {
    // authentication strategy identifier (optional - kuzzle will use "local" strategy if not set)
    "strategy": "<passportjs_strategy>",

    // jwt token expiration time (optional - kuzzle will use server default value if not set)
    // expressed in seconds or a string describing a time span. Eg: 60, "2 days", "10h", "7d", "1y"
    "expiresIn": "<expiresIn>",

    // set of parameters depending of the chosen strategy. Example for "local" strategy:
    "username": "<username>",
    "password": "<password>"
  }
}
```

>Response

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "controller": "auth",
  "action": "login",
  "requestId": "<unique request identifier>",
  "metadata": {},
  "result": {
    "_id": "<userId>",
    "jwt": "<JWT encrypted token>"
  }
}
```

Authenticate a user with a defined **passportjs** authentication strategy.
See [passportjs.org](http://www.passportjs.org/) for more details about authentication strategies.

Strategies are implemented as [plugins](https://github.com/kuzzleio/kuzzle/blob/master/docs/plugins.md).
The default "local" strategy is enabled by default
(see [kuzzle-plugin-auth-passport-local](https://github.com/kuzzleio/kuzzle-plugin-auth-passport-local)),
and let you authenticate with a login and password.

The **_login** action returns an encrypted JWT token, that must then be sent within the [requests headers](#authorization-header).



## logout

<section class="http"></section>

>**URL:** `http://kuzzle:7511/_logout`  
>**Method:** `GET`  
>**Headers:** `Authorization: "Bearer <encrypted_jwt_token>"`

<section class="others"></section>

>Query

<section class="others"></section>

```litcoffee
{
  "controller": "auth",
  "action": "logout",
  "jwt": "<encrypted_jwt_token>"
}
```

Revoke token validity & unsubscribe from registered rooms

The **_logout** action doesn't take strategy.

<aside class="warning">
    <strong>The auth/logout action will be removed on the next RC1 release of Kuzzle.</strong>
    <br>
    <br>
    Kuzzle will implement two authentication modes soon:
  <ol>
    <li>
      A default stateless mode, in which the expiration will solely rely on the JWT ttl.
      The logout action won't be available in this mode.
    </li>
    <li>
      A full Session mode, handled by a plugin, in which the logout route will be updated (@tbd).
    </li>
  </ol>
</aside>


## updateSelf

<section class="http"></section>

>**URL:** `http://kuzzle:7511/_updateSelf`  
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

>Query

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

>Response

```litcoffee
{
  "status": 200,                      // Assuming everything went well
  "error": null,                      // Assuming everything went well
  "action": "updateSelf",
  "controller": "auth",
  "metadata": {},
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
