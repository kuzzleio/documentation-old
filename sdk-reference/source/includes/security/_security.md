# Security

The Security component lets you handle users permissions in Kuzzle.

Please refer to our [Kuzzle permissions guide](/guide/#permissions) for more information.

## Constructors

```js
/*
 Constructor is not exposed in the JS/Node SDK. You may get the instantiated
 Security object by calling Kuzzle.security
 */
var kuzzleSecurity = kuzzle.security;
```

```java
// using the static instance
Security security = kuzzle.security;

// or instantiating a new Security object
Security security = new Security(kuzzle);
```

```php
<?php

use \Kuzzle\Kuzzle;
use \Kuzzle\Security\Security;

$kuzzle = new Kuzzle('localhost');

// using the static instance
$security = $kuzzle->security();

// or instantiating a new Security object
$security = new Security($kuzzle);
```

### Security(Kuzzle)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| `Kuzzle` | object | An instantiated `Kuzzle` object |


## Properties

There are no exposed properties for this object.


## createRole

```js
var roleDefinition = {
  controllers: {
    "*": {
      actions: {
        "*": true
      }
    }
  }
};

// You can chose to replace the given role if already exists
var options = {
  replaceIfExist: true
};

// Using callbacks (NodeJS or Web Browser)
kuzzle
  .security
  .createRole('myrole', roleDefinition, options, function(error, response) {
    // result is a Role object
  });

// Using promises (NodeJS)
kuzzle
  .security
  .createRolePromise('myrole', roleDefinition, options)
  .then((response) => {
    // result is a Role object
  });
```

```java
JSONObject roleDefinition = new JSONObject()
  .put("controllers", new JSONObject()
    .put("*", new JSONObject()
      .put("actions", new JSONObject()
        .put("*", true)
      )
    )
  )
);

Options opts = new Options().setReplaceIfExist(true);

kuzzle
  .security
  .createRole("myrole", roleDefinition, opts, new ResponseListener<Role>() {
    @Override
    public void onSuccess(Role role) {
      // the result is an instantiated Role object
    }

    @Override
    public void onError(JSONObject error) {

    }
  })
```

```php
<?php

use \Kuzzle\Kuzzle;
use \Kuzzle\Security\Role;

$roleId = 'myRole';
$roleDefinition = [
  'controllers' => [
    '*' => [
      'actions' => [
        '*' => true
      ]
    ]
  ]
];

$kuzzle = new Kuzzle('localhost');
$security = $kuzzle->security();

try {
  $role = $security->createRole($roleId, $roleDefinition);

  // $role instanceof Role
}
catch (ErrorException $e) {
  // error occurred
}
```

Create a new role in Kuzzle.

<aside class="notice">
There is a small delay between role creation and their creation in our search layer, usually a couple of seconds.
That means that a role that was just been created will not be returned by <code>searchRole</code> function
</aside>


### createRole(id, content, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``id`` | string | Unique role identifier |
| ``content`` | JSON Object | A plain JSON object representing the role |
| ``options`` | string | (Optional) Optional arguments |
| ``callback`` | function | Callback handling the response |

Available options:

| Filter | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``replaceIfExist`` | boolean | If the same role already exists: throw an error if sets to false. Replace the existing role otherwise | ``false`` |
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

### Callback response

Resolves to a [Role](#role) object.

## createProfile

```js
var profileDefinition = {
  policies: [
    {roleId: 'myrole'},
    {roleId: 'default', restrictedTo: [{index: 'index1'}, {index: 'index2', collections: ['foo', 'bar'] } ] }
  ]
};

// You can chose to replace the given profile if already exists
var options = {
  replaceIfExist: true
};

// Using callbacks (NodeJS or Web Browser)
kuzzle
  .security
  .createProfile('myprofile', profileDefinition, options, function(error, response) {
    // result is a Profile object
  });

// Using promises (NodeJS)
kuzzle
  .security
  .createProfilePromise('myprofile', profileDefinition, options)
  .then((response) => {
    // result is a Profile object
  });
```

```java
JSONObject role1 = new JSONObject()
  .put("roleId", "myrole");

JSONObject role2 = new JSONObject()
  .put("roleId", "default")
  .put("restrictedTo", new JSONArray()
    .put(new JSONObject().put("index", "index1"))
    .put(new JSONObject()
      .put("index", "index2")
      .put("collections",new JSONArray().put("foo").put("bar"))
    )
  );
JSONObject profileDefinition = new JSONObject()
  .put("policies", new JSONArray()
    .put(role1)
    .put(role2)
  );

Options opts = new Options().setReplaceIfExist(true);

kuzzle
  .security
  .createProfile("myprofile", profileDefinition, opts, new ResponseListener<Profile>() {
    @Override
    public void onSuccess(Profile profile) {

    }

    @Override
    public void onError(JSONObject error) {

    }
  });
```

```php
<?php

use \Kuzzle\Kuzzle;
use \Kuzzle\Security\Profile;

$profileId = 'myProfile';
$profileDefinition = [
  'policies' => [
    [
      'roleId' => 'myRole'
    ],
    [
      'roleId' => 'anonymous',
      'restrictedTo' => [
        ['index' => 'my-second-index', 'collection' => ['my-collection']]
      ]
    ]
  ]
];

$kuzzle = new Kuzzle('localhost');
$security = $kuzzle->security();

try {
  $profile = $security->createProfile($profileId, $profileDefinition);

  // $profile instanceof Profile
}
catch (ErrorException $e) {

}
```

Create a new profile in Kuzzle.

<aside class="notice">
There is a small delay between profile creation and their creation in our search layer, usually a couple of seconds.
That means that a profile that was just been created will not be returned by <code>searchProfiles</code> function
</aside>

### createProfile(id, content, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``id`` | string | Unique profile identifier |
| ``content`` | JSON Object | A plain JSON object representing the profile and credentials |
| ``options`` | string | (Optional) Optional arguments |
| ``callback`` | function | Callback handling the response |

Available options:

| Filter | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``replaceIfExist`` | boolean | If the same profile already exists: throw an error if sets to false. Replace the existing profile otherwise | ``false`` |
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

### Callback response

Resolves to a [Profile](#profile) object.


## createUser

```js
var userContent = {
  content: {
    // A "profile" field is required to bind a user to an existing profile
    profileIds: ['admin'],
    firstname: 'John',
    lastname: 'Doe'
  },
  credentials: {
    local: {
      // The "local" authentication strategy requires a password
      password: 'secretPassword',
      // You can also set custom fields to your user
      lastLoggedIn: 1494411803
    }
  }
};

// You can chose to replace the given user if already exists
var options = {
  replaceIfExist: true
};


// Using callbacks (NodeJS or Web Browser)
kuzzle
  .security
  .createUser('myuser', userContent, options, function(error, response) {
    // result is a User object
  });

// Using promises (NodeJS)
kuzzle
  .security
  .createUserPromise('myuser', userContent, options)
  .then((response) => {
    // result is a User object
  });
```

```java
JSONObject content = new JSONObject()
  // A "profile" field is required to bind a user to an existing profile
  .put("profileIds", new JSONArray().put("admin")
  // You can also set custom fields to your user
  .put("firstname", "John")
  .put("lastname", "Doe"))
JSONObject newUser = new JSONObject().put("content", content);

JSONObject credentials = new JSONObject()
  .put("local", new JSONObject()
  // The "local" authentication strategy requires a password
  .put("password", "secret password")
  .put("lastLoggedIn", 1494411803);

newUser.put("credentials", credentials);

Options opts = new Options().setReplaceIfExist(true);

kuzzle
  .security
  .createUser("myNewUser", newUser, opts, new ResponseListener<User>() {
    @Override
    public void onSuccess(User user) {

    }

    @Override
    public void onError(JSONObject error) {

    }
  });
```

```php
<?php

use \Kuzzle\Kuzzle;
use \Kuzzle\Security\User;

$kuid = 'myUser';
$userDefinition = [
    'content' => [
      // A "profile" field is required to bind a user to an existing profile
      'profileIds' => ['admin'],
      // You can also set custom fields to your user
      'firstname' => 'John',
      'lastname' => 'Doe'
    ],
    'credentials' => [
      'local' => [
        // The "local" authentication strategy requires a password
        'password' => 'secretPassword',
        'lastLoggedIn' => 1494411803
      ]
    ]
  ];

$kuzzle = new Kuzzle('localhost');
$security = $kuzzle->security();

try {
  $user = $security->createUser($kuid, $userDefinition);

  // $user instanceof User
}
catch (ErrorException $e) {

}
```

Create a new user in Kuzzle.

<aside class="notice">
There is a small delay between user creation and their creation in our search layer, usually a couple of seconds.
That means that a user that was just been created will not be returned by <code>searchUsers</code> function
</aside>

### createUser(id, content, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``id`` | string | Unique user identifier, will be used as username |
| ``content`` | JSON Object | A plain JSON object representing the user |
| ``options`` | string | (Optional) Optional arguments |
| ``callback`` | function | Callback handling the response |


Available options:

| Filter | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``replaceIfExist`` | boolean | If the same user already exists: throw an error if sets to false. Replace the existing user otherwise | ``false`` |
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

### Callback response

Resolves to a [User](#user) object.

## createRestrictedUser

```js
var userContent = {
  content: {
  },
  credentials: {
    local: {
      // The "local" authentication strategy requires a password
      password: 'secretPassword',
      lastLoggedIn: 1494411803
    }
  }
};


// Using callbacks (NodeJS or Web Browser)
kuzzle
  .security
  .createRestrictedUser('myuser', userContent, options, function(error, response) {
    // result is a User object
  });

// Using promises (NodeJS)
kuzzle
  .security
  .createRestrictedUserPromise('myuser', userContent, options)
  .then((response) => {
    // result is a User object
  });
```

```java
JSONObject content = new JSONObject();

JSONObject newUser = new JSONObject().put("content", content);

JSONObject credentials = new JSONObject()
  .put("local", new JSONObject()
  // The "local" authentication strategy requires a password
  .put("password", "secret password")
  .put("lastLoggedIn", 1494411803));

newUser.put("credentials", credentials);

Options opts = new Options().setReplaceIfExist(true);

kuzzle
  .security
  .createUser("myNewUser", newUser, opts, new ResponseListener<User>() {
    @Override
    public void onSuccess(User user) {

    }

    @Override
    public void onError(JSONObject error) {

    }
  });
```

```php
<?php

use \Kuzzle\Kuzzle;
use \Kuzzle\Security\User;

$kuid = 'myUser';
$userDefinition = [
    'content' => [
    ],
    'credentials' => [
      'local' => [
        // The "local" authentication strategy requires a password
        'password' => 'secretPassword',
        'lastLoggedIn' => 1494411803
      ]
    ]
  ];

$kuzzle = new Kuzzle('localhost');
$security = $kuzzle->security();

try {
  $user = $security->createRestrictedUser($kuid, $userDefinition);

  // $user instanceof User
}
catch (ErrorException $e) {

}
```

Create a new restricted user in Kuzzle.  
This function allows anonymous users for instance to create a "restricted" user with predefined rights.

<aside class="notice">
There is a small delay between user creation and their creation in our search layer, usually a couple of seconds.
That means that a user that was just been created will not be returned by <code>searchUsers</code> function.
<br/>

</aside>

### createRestrictedUser(id, content, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``id`` | string | Unique user identifier, will be used as username |
| ``content`` | JSON Object | A plain JSON object representing the user |
| ``options`` | string | (Optional) Optional arguments |
| ``callback`` | function | Callback handling the response |


Available options:

| Filter | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

### Callback response

Resolves to a [User](#user) object.


## deleteProfile

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle
  .security
  .deleteProfile('myprofile', function(error, result) {

  });

// Using promises (NodeJS)
kuzzle
  .security
  .deleteProfilePromise('myprofile')
  .then((result) => {

  });
```

```java
kuzzle
  .security
  .deleteProfile("myprofile", new ResponseListener<String>() {
    @Override
    public void onSuccess(String profileName) {

    }

    @Override
    public void onError(JSONObject error) {

    }
  });
```

```php
<?php

use \Kuzzle\Kuzzle;

$profileId = 'myProfile';

$kuzzle = new Kuzzle('localhost');

try {
  $kuzzle->security()->deleteProfile($profileId);
}
catch (ErrorException $e) {

}
```

> Callback response

```json
"deleted profile identifier"
```

Delete the provided profile.

<aside class="notice">
There is a small delay between profile deletion and their deletion in our search layer, usually a couple of seconds.
That means that a profile that was just been delete will be returned by <code>searchProfiles</code> function
</aside>

### deleteProfile(id, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``id`` | string | Unique profile identifier to delete |
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | (Optional) Callback handling the response |

Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |


### Return value

Returns the `Security` object to allow chaining.

### Callback response

Resolves the profile id which has been deleted.

## deleteRole

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle
  .security
  .deleteRole('myrole', function(error, result) {

  });

// Using promises (NodeJS)
kuzzle
  .security
  .deleteRolePromise('myrole')
  .then((result) => {

  });
```

```java
kuzzle
  .security
  .deleteRole("myrole", new ResponseListener<String>() {
    @Override
    public void onSuccess(String roleName) {

    }

    @Override
    public void onError(JSONObject error) {

    }
  });
```

```php
<?php

use \Kuzzle\Kuzzle;

$roleId = 'myRole';

$kuzzle = new Kuzzle('localhost');

try {
  $kuzzle->security()->deleteRole($roleId);
}
catch (ErrorException $e) {

}
```

> Callback response

```json
"deleted role identifier"
```

Delete the provided role.

<aside class="notice">
There is a small delay between role deletion and their deletion in our search layer, usually a couple of seconds.
That means that a role that was just been delete will be returned by <code>searchRoles</code> function
</aside>

### deleteRole(id, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``id`` | string | Unique role identifier to delete |
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | (Optional) Callback handling the response |

Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

### Return value

Returns the `Security` object to allow chaining.

### Callback response

Resolves the role id which has been deleted.


## deleteUser

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle
  .security
  .deleteUser('myuser', function(error, result) {

  });

// Using promises (NodeJS)
kuzzle
  .security
  .deleteUserPromise('myuser')
  .then((result) => {

  });
```

```java
kuzzle
  .security
  .deleteUser("myuser", new ResponseListener<String>() {
    @Override
    public void onSuccess(String userName) {

    }

    @Override
    public void onError(JSONObject error) {

    }
  });
```

```php
<?php

use \Kuzzle\Kuzzle;

$kuid = 'myUser';

$kuzzle = new Kuzzle('localhost');

try {
  $kuzzle->security()->deleteUser($kuid);
}
catch (ErrorException $e) {

}
```

> Callback response

```json
"deleted user identifier"
```

Delete the provided user.

<aside class="notice">
There is a small delay between user deletion and their deletion in our search layer, usually a couple of seconds.
That means that a user that has just been delete will be returned by <code>searchUsers</code> function
</aside>

### deleteUser(id, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``id`` | string | Unique user identifier to delete |
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | (Optional) Callback handling the response |

Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

### Return value

Returns the `Security` object to allow chaining.

### Callback response

Resolves the user id which has been deleted.


## fetchProfile

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle
  .security
  .fetchProfile('myprofile', function(error, result) {
    // result is a Profile object
  });

// Using promises (NodeJS)
kuzzle
  .security
  .fetchProfilePromise('myprofile')
  .then((result) => {
    // result is a Profile object
  });
```

```java

kuzzle
  .security
  .fetchProfile("myprofile", new ResponseListener<Profile>() {
    @Override
    public void onSuccess(Profile profile) {

    }

    @Override
    public void onError(JSONObject error) {

    }
  });
```

```php
<?php

use \Kuzzle\Kuzzle;
use \Kuzzle\Security\Profile;

$profileId = 'myProfile';

$kuzzle = new Kuzzle('localhost');

try {
  $profile = $kuzzle->security()->fetchProfile($profileId);

  // $profile instanceof Profile
}
catch (ErrorException $e) {

}
```

Retrieves a single stored profile using its unique ID.

### fetchProfile(id, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``id`` | string | Unique profile identifier |
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Callback handling the response |

Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

### Callback response

Resolves to a [Profile](#profile) object.

## fetchRole

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle
  .security
  .fetchRole('myrole', function(error, result) {
    // result is a Role object
  });

// Using promises (NodeJS)
kuzzle
  .security
  .fetchRolePromise('myrole')
  .then((result) => {
    // result is a Role object
  });
```

```java

kuzzle
  .security
  .fetchRole("myrole", new ResponseListener<Role>() {
    @Override
    public void onSuccess(Role role) {

    }

    @Override
    public void onError(JSONObject error) {

    }
  });
```

```php
<?php

use \Kuzzle\Kuzzle;
use \Kuzzle\Security\Role;

$roleId = 'myRole';

$kuzzle = new Kuzzle('localhost');

try {
  $role = $kuzzle->security()->fetchRole($roleId);

  // $role instanceof Role
}
catch (ErrorException $e) {

}
```

Retrieves a single stored role using its unique ID.

### fetchRole(id, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``id`` | string | Unique role identifier |
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Callback handling the response |

Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

### Callback response

Resolves to a [Role](#role) object.

## fetchUser

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle
  .security
  .fetchUser('myuser', function(error, result) {
    // result is a User object
  })

// Using promises (NodeJS)
kuzzle
  .security
  .fetchUserPromise('myuser')
  .then((result) => {
    // result is a User object
  })
```

```java
kuzzle
  .security
  .fetchUser("myuser", new ResponseListener<User>() {
    @Override
    public void onSuccess(User user) {

    }

    @Override
    public void onError(JSONObject error) {

    }
  });
```

```php
<?php

use \Kuzzle\Kuzzle;
use \Kuzzle\Security\User;

$kuid = 'myUser';

$kuzzle = new Kuzzle('localhost');

try {
  $user = $kuzzle->security()->fetchUser($kuid);

  // $user instanceof User
}
catch (ErrorException $e) {

}
```

Retrieves a single stored user using its unique ID.

### fetchUser(id, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``id`` | string | Unique user identifier |
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Callback handling the response |

Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

### Callback response

Resolves to a [User](#user) object.


## getUserRights

```js
// Using callbacks (NodeJS or Web Browser)
kuzzle
  .security
  .getUserRights('id', function(error, result) {
    // result is a JSON object
  });

// Using promises (NodeJS)
kuzzle
  .security
  .getUserRightsPromise('id')
  .then((result) => {
    // result is a JSON object
  });
```

```java

kuzzle
  .security
  .getUserRights("id", new ResponseListener<JSONObject>() {
    @Override
    public void onSuccess(JSONObject rights) {

    }

    @Override
    public void onError(JSONObject error) {

    }
  });
```

```php
<?php

use \Kuzzle\Kuzzle;

$kuid = 'myUser';

$kuzzle = new Kuzzle('localhost');

try {
  $rights = $kuzzle->security()->getUserRights($kuid);

}
catch (ErrorException $e) {

}
```

> Callback response example

```js
[
  {
    controller: 'my-controller', action: 'my-action', index: '*', collection: '*',
    value: 'allowed'
  },
  {
    controller: 'another-controller', action: '*', index: 'my-index', collection: '*',
    value: 'conditional'
  }
]
```

Gets the rights of the currently logged user.

#### getUserRights(id, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``id`` | String | Id of the user |
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Callback handling the response |

Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

#### Callback response

Resolves to a `JSON` object.


## isActionAllowed

```js
kuzzle.security.getMyRights((err, rights) => {
    if (!err) {
        // returns either "allowed", "denied" or "conditional"
        var allowed = kuzzle.security.isActionAllowed(rights, 'read', 'get', 'index1', 'collection1');
    }
});
```

```java
kuzzle.security.getMyRights(new ResponseListener<JSONArray>() {
    @Override
    public void onSuccess(JSONArray rights) {
        // Policies is an enum with the following properties:
        // allowed, denied, conditional
        Policies authorization = kuzzle.security.isActionAllowed(rights, "read", "get", "index1", "collection1");
    }

    @Override
    public void onError(JSONObject error) {
     // ...
    }
});
```

```php
<?php

use \Kuzzle\Kuzzle;
use \Kuzzle\Security\Security;

$kuzzle = new Kuzzle('localhost');

try {
  $rights = $kuzzle->security()->getMyRights();

  switch ($kuzzle->security()->isActionAllowed($rights, 'read', 'get', 'index1', 'collection1')) {
    case Security::ACTION_ALLOWED:
      // code...
      break;
    case Security::ACTION_DENIED:
      // code...
      break;
    case Security::ACTION_CONDITIONAL:
      // code...
      break;
  }
}
catch (ErrorException $e) {

}
```

Tells whether an action is allowed, denied or conditional based on the rights provided as the first argument:

- `allowed` is returned when an action is authorized without condition
- `conditional` is returned when the authorization depends on a closure
- `denied` is returned when the action is forbidden

An action is defined as a couple of action and controller (mandatory), plus an index and a collection(optional).

<aside class="notice">
You can get the rights from Kuzzle by using <a href="#getUserRights">`Security.getUserRights`</a> and <a href="#getMyRights">`Security.getMyRights`</a>.
</aside>

#### isActionAllowed(rights, controller, action, index, collection)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``rights`` | JSON array | Rights list |
| ``controller`` | String | The controller |
| ``action`` | String | The action |
| ``index`` | String | The index |
| ``collection`` | String | The collection |

#### Return value

Returns either `allowed`, `denied` or `conditional`.


## profile

```js
var profileDefinition = {
  policies: [
    {roleId: 'myrole'},
    {roleId: 'default', restrictedTo: [{index: 'index1'}, {index: 'index2', collections: ['foo', 'bar'] } ] }
  ]
};

var profile = kuzzle.security.profile('myprofile', profileDefinition);
```

```java
JSONObject policy1 = new JSONObject()
  .put("roleId", "myrole");

JSONObject policy2 = new JSONObject()
  .put("roleId", "default")
  .put("restrictedTo", new JSONArray()
    .put(new JSONObject().put("index", "index1"))
    .put(new JSONObject()
      .put("index", "index2")
      .put("collections",new JSONArray().put("foo").put("bar"))
    )
  );
JSONObject profileDefinition = new JSONObject()
  .put("policies", new JSONArray()
    .put(policy1)
    .put(policy2)
  );

Profile profile = kuzzle.security.profile("myprofile", profileDefinition);
```


```php
<?php

use \Kuzzle\Kuzzle;
use \Kuzzle\Security\Profile;

$profileId = 'myProfile';
$profileDefinition = [
  'policies' => [
    [
      'roleId' => 'myRole'
    ],
    [
      'roleId' => 'anonymous',
      'restrictedTo' => [
        ['index' => 'my-second-index', 'collection' => ['my-collection']]
      ]
    ]
  ]
];

$kuzzle = new Kuzzle('localhost');
$security = $kuzzle->security();

$profile = $security->profile($profileId, $profileDefinition);

// $profile instanceof Profile
```

Instantiate a new [Profile](#profile) object.

### profile(id, content)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``id`` | string | Unique profile identifier |
| ``content`` | JSON Object | Profile content |

### Return value

Returns the new [Profile](#profile) object.


## role

```js
var roleDefinition = {
  controllers: {
    "*": {
      actions: {
        "*": true
      }
    }
  }
};

var role = kuzzle.security.role('role', roleDefinition);
```

```java
JSONObject roleDefinition = new JSONObject()
  .put("controllers", new JSONObject()
    .put("*", new JSONObject()
      .put("actions", new JSONObject()
        .put("*", true)
      )
    )
  )
);

Role role = kuzzle.security.role("myrole", roleDefinition);
```

```php
<?php

use \Kuzzle\Kuzzle;
use \Kuzzle\Security\Role;

$roleId = 'myRole';
$roleDefinition = [
  'controllers' => [
    '*' => [
      'actions' => [
        '*' => true
      ]
    ]
  ]
];

$kuzzle = new Kuzzle('localhost');
$security = $kuzzle->security();

$role = $security->role($roleId, $roleDefinition);

// $role instanceof Role
```

Instantiate a new [Role](#role) object.

### role(id, content)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``id`` | string | Unique role identifier |
| ``content`` | JSON Object | Role content |

### Return value

Returns the new [Role](#role) object.


## searchProfiles

```js
var filters = {
   // filter can contains an array `roles` with a list of role id
  policies:  ['myrole', 'admin'],
  // filter can handler pagination with properties `from` and `size`
  from: 0,
  size: 10
};

// Using callbacks (NodeJS or Web Browser)
kuzzle
  .security
  .searchProfiles(filters, function(error, result) {
    // result is a JSON Object with the following properties:
    // {
    //   total: <number of found profiles>,
    //   documents: [<Profile object>, <Profile object>, ...]
    // }
  });

// Using promises (NodeJS)
kuzzle
  .security
  .searchProfilesPromise(filters)
  .then((result) => {
    // result is a JSON Object with the following properties:
    // {
    //   total: <number of found profiles>,
    //   documents: [<Profile object>, <Profile object>, ...]
    // }
  });
```

```java
JSONObject filters = new JSONObject()
  // filter can contains a "roles" array with a list of role IDs
  .put("policies", new JSONArray().put("myrole", "admin"))
  // search results can be paginated
  .put("from", 0)
  .put("size", 10);

kuzzle
  .security
  .searchProfiles(filters, new ResponseListener<SecurityDocumentList>() {
    @Override
    public void onSuccess(SecurityDocumentList profiles) {
      // Contains a profiles list
      for(Profile profile : profiles.getDocuments()) {

      }

      // And the total number of profiles, regardless of pagination
      profiles.getTotal();
    }

    @Override
    public void onError(JSONObject error) {

    }
  });

```

```php
<?php

use \Kuzzle\Kuzzle;
use \Kuzzle\Security\Profile;
use \Kuzzle\Util\ProfilesSearchResult;

$filters = [
  'policies' => [
      'admin',
      'myrole'
  ]
];

$options = [
  'from' => 0,
  'size' => 1
];

$kuzzle = new Kuzzle('localhost');
$security = $kuzzle->security();

try {
  $result = $security->searchProfiles($filters, $options);

  // $result instanceof ProfilesSearchResult
  foreach($result->getProfiles() as $profile) {
    // $profile instanceof Profile
  }
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
{
  "total": 124,
  "documents": [
    // array of Profile objects
  ]
}
```

Executes a search on profiles according to a filter

### searchProfiles(filters, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``filters`` | JSON Object | List of filters to retrieves roles |
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Callback handling the response |

Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``from`` | number | Starting offset | ``0`` |
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |
| ``size`` | integer | Number of hits to return | ``20`` |

Available filters:

| Filter | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``roles`` | array | Contains an array `roles` with a list of role id | ``undefined`` |

### Callback response

Resolves to a JSON Object containing the number of found profiles and an array of [Profile](#profile) objects.


## searchUsers

```js
var filter = {
  filter: {
    and: [
      {
        terms: {
          profileIds: ['anonymous', 'default'],
        }
      },
      {
        geo_distance: {
          distance: '10km',
          pos: {
            lat: '48.8566140', lon: '2.352222'
          }
        }
      }
    ]
  }
};

// Using callbacks (NodeJS or Web Browser)
kuzzle
  .security
  .searchUsers(filters, function(error, result) {
    // result is a JSON Object with the following properties:
    // {
    //   total: <number of found profiles>,
    //   documents: [<User object>, <User object>, ...]
    // }
  });

// Using promises (NodeJS)
kuzzle
  .security
  .searchUsersPromise(filters)
  .then((result) => {
    // result is a JSON Object with the following properties:
    // {
    //   total: <number of found profiles>,
    //   documents: [<User object>, <User object>, ...]
    // }
  });
```

```java
JSONObject filter = new JSONObject()
  .put("filter", new JSONObject()
    .put("and", new JSONArray()
      .put("terms", new JSONObject()
        .put("profileIds", new JSONArray().put("anonymous").put("default"))
      )
      .put("geo_distance", new JSONObject()
        .put("distance", "10km")
        .put("pos", new JSONObject()
          .put("lat", "48.8566140")
          .put("lon", "2.352222")
        )
      )
    )
  );

kuzzle
  .security
  .searchUsers(filters, new ResponseListener<SecurityDocumentList>() {
    @Override
    public void onSuccess(SecurityDocumentList users) {
      // users.getDocuments() returns an users list
      for(User user : users.getDocuments()) {

      }

      // users.getTotal() returns the number of matched users, regardless of pagination
      users.getTotal();
    }

    @Override
    public void onError(JSONObject error) {

    }
  });
```

```php
<?php

use \Kuzzle\Kuzzle;
use \Kuzzle\Security\User;
use \Kuzzle\Util\UsersSearchResult;

$filters = [
  'filter' => [
    'and' => [
      [
        'terms' => [
          'profileIds' => ['anonymous', 'default'],
        ]
      ],
      [
        'geo_distance' => [
          'distance' => '10km',
          'pos' => [
            'lat' => '48.8566140',
            'lon' => '2.352222'
          ]
        ]
      ]
    ]
  ]
];

$kuzzle = new Kuzzle('localhost');
$security = $kuzzle->security();

try {
  $result = $security->searchUsers($filters);

  // $result instanceof UsersSearchResult

  foreach($result->getUsers() as $user) {
    // $user instanceof User
  }
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
{
  "total": 124,
  "documents": [
    // array of User
  ]
}
```

Executes a search on users according to a filter

### searchUsers(filters, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``filters`` | JSON Object | [Filters](/real-time-filters/) |
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Callback handling the response |

Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``from`` | number | Starting offset | ``0`` |
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |
| ``size`` | number |  Number of hits to return | ``20`` |

### Callback response

Resolves to a JSON Object containing the total number of found users, and an array of [User](#user) objects.


## searchRoles

```js
var filters = {
   // filter can contains an array `controllers` with a list of controller name
  controllers:  ['read', 'write'],
  // filter can handler pagination with properties `from` and `size`
  from: 0,
  size: 10
};

// Using callbacks (NodeJS or Web Browser)
kuzzle
  .security
  .searchRoles(filters, function(error, result) {
    // result is a JSON Object with the following properties:
    // {
    //   total: <number of found profiles>,
    //   documents: [<Role object>, <Role object>, ...]
    // }
  });

// Using promises (NodeJS)
kuzzle
  .security
  .searchRolesPromise(filters)
  .then((result) => {
    // result is a JSON Object with the following properties:
    // {
    //   total: <number of found profiles>,
    //   documents: [<Role object>, <Role object>, ...]
    // }
  });
```

```java
JSONObject filter = new JSONObject()
  .put("controllers", new JSONArray()
    .put("read")
    .put("write")
  )
  .put("from", 0)
  .put("size", 10);


kuzzle
  .security
  .searchRoles(filter, new ResponseListener<SecurityDocumentList>() {
    @Override
    public void onSuccess(SecurityDocumentList roles) {
      // roles.getDocuments() returns a roles list
      for(Role role : roles.getDocuments()) {

      }

      // roles.getTotal() returns the number of matched roles, regardless of pagination
      roles.getTotal();
    }
  });
```

```php
<?php

use \Kuzzle\Kuzzle;
use \Kuzzle\Security\Role;
use \Kuzzle\Util\RolesSearchResult;

$filters = [
  'controllers' => [
    'read',
    'write'
  ],
  'size' => 10,
  'from' => 0
];

$kuzzle = new Kuzzle('localhost');
$security = $kuzzle->security();

try {
  $result = $security->searchRoles($filters);

  // $result instanceof RolesSearchResult

  foreach($result->getRoles() as $role) {
    // $role instanceof Role
  }
}
catch (ErrorException $e) {

}
```

> Callback response:

```json
{
  "total": 124,
  "documents": [
    // array of Role
  ]
}
```

Executes a search on roles according to a filter

### searchRoles(filters, [options], callback)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``filters`` | JSON Object | List of filters to retrieves roles |
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Callback handling the response |

Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``from`` | number | Starting offset | ``0`` |
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |
| ``size`` | number |  Number of hits to return | ``20`` |

Available filters:

| Filter | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``indexes`` | array | List of indexes id related to the searched role | ``undefined`` |

### Callback response

Resolves to a JSON Object containing the total number of found roles and an array of [Role](#role) objects.

## updateProfile

```js
var newContent = {
  policies: [
    {roleId: 'myrole'},
    {roleId: 'default', restrictedTo: [{index: 'index1'}, {index: 'index2', collections: ['foo', 'bar'] } ] }
  ]
};
// Using callbacks (NodeJS or Web Browser)
kuzzle
  .security
  .updateProfile("profile ID", newContent, function (err, updatedProfile) {
    // "updatedProfile" is an instance of a Profile object
  });

// Using promises (NodeJS)
kuzzle
  .security
  .updateProfilePromise("profile ID", newContent)
  .then(updatedProfile => {
    // "updatedProfile" is an instance of a Profile object
  });
```

```java
JSONObject policy1 = new JSONObject()
  .put("roleId", "myrole");

JSONObject policy2 = new JSONObject()
  .put("roleId", "default")
  .put("restrictedTo", new JSONArray()
    .put(new JSONObject().put("index", "index1"))
    .put(new JSONObject()
      .put("index", "index2")
      .put("collections",new JSONArray().put("foo").put("bar"))
    )
  );

JSONObject newContent = new JSONObject()
  .put("policies", new JSONArray()
    .put(policy1)
    .put(policy2)
  );

kuzzle
  .security
  .updateProfile("profile ID", newContent, new ResponseListener<Profile>() {
    @Override
    public void onSuccess(Profile profile) {

    }

    @Override
    public void onError(JSONObject error) {

    }
  });
```

```php
<?php

use \Kuzzle\Kuzzle;
use \Kuzzle\Security\Profile;

$profileId = 'myProfile';
$profileDefinition = [
  'policies' => [
    [
      'roleId' => 'myRole'
    ],
    [
      'roleId' => 'anonymous',
      'restrictedTo' => [
        ['index' => 'my-second-index', 'collection' => ['my-collection']]
      ]
    ]
  ]
];

$kuzzle = new Kuzzle('localhost');
$security = $kuzzle->security();

try {
  $profile = $security->updateProfile($profileId, $profileDefinition);

  // $profile instanceof Profile
}
catch (ErrorException $e) {

}
```

#### updateProfile(id, content, [options], [callback])

Performs a partial update on an existing profile.

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``id`` | string | Unique role identifier |
| ``content`` | JSON Object | A plain JSON object representing the profile |
| ``options`` | string | (Optional) Optional arguments |
| ``callback`` | function | (Optional) Callback handling the response |

Available options:

| Filter | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

### Return value

Returns the `Security` object to allow chaining.

### Callback response

Resolves to an updated [Profile](#profile) object

## updateRole

```js
var roleDefinition = {
  controllers: {
    "read": {
      actions: {
        "get": true
      }
    }
  }
};

// Using callbacks (NodeJS or Web Browser)
kuzzle
  .security
  .updateRole("role ID", roleDefinition, function (err, updatedRole) {
    // "updatedRole" is an instance of a Role object
  });

// Using promises (NodeJS)
kuzzle
  .security
  .updateRolePromise("profile ID", roleDefinition)
  .then(updatedRole => {
    // "updatedRole" is an instance of a Role object
  });
```

```java
JSONObject roleDefinition = new JSONObject()
  .put("controllers", new JSONObject()
    .put("*", new JSONObject()
      .put("actions", new JSONObject()
        .put("*", true)
      )
    )
  )
);

kuzzle
  .security
  .updateRole("Role ID", roleDefinition, new ResponseListener<Role>() {
    @Override
    public void onSuccess(Role role) {

    }

    @Override
    public void onError(JSONObject error) {

    }
  });
```

```php
<?php

use \Kuzzle\Kuzzle;
use \Kuzzle\Security\Role;

$roleId = 'myRole';
$roleDefinition = [
  'controllers' => [
    '*' => [
      'actions' => [
        '*' => true
      ]
    ]
  ]
];

$kuzzle = new Kuzzle('localhost');
$security = $kuzzle->security();

try {
  $role = $security->updateRole($roleId, $roleDefinition);

  // $role instanceof Role
}
catch (ErrorException $e) {

}
```

#### updateRole(id, content, [options], [callback])

Performs a partial update on an existing role.

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``id`` | string | Unique role identifier |
| ``content`` | JSON Object | A plain JSON object representing the role |
| ``options`` | string | (Optional) Optional arguments |
| ``callback`` | function | (Optional) Callback handling the response |

Available options:

| Filter | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

### Return value

Returns the `Security` object to allow chaining.

### Callback response

Resolves to an updated [Role](#role) object


## updateUser

```js
var newContent = {
  firstname: 'My Name Is',
  lastname: 'Jonas'
};


// Using callbacks (NodeJS or Web Browser)
kuzzle
  .security
  .updateUser("User ID", newContent, function (err, updatedUser) {
    // "updatedUser" is an instance of a User object
  });

// Using promises (NodeJS)
kuzzle
  .security
  .updateUserPromise("User ID", newContent)
  .then(updatedUser => {
    // "updatedUser" is an instance of a User object
  });
```

```java
JSONObject newContent = new JSONObject()
  .put("firstname", "My Name Is")
  .put("lastname", "Jonas");

kuzzle
  .security
  .updateUser("User ID", newContent, new ResponseListener<User>() {
    @Override
    public void onSuccess(User user) {

    }

    @Override
    public void onError(JSONObject error) {

    }
  });
```

```php
<?php

use \Kuzzle\Kuzzle;
use \Kuzzle\Security\User;

$kuid = 'myUser';
$userDefinition = [
  'firstname' => 'My Name Is',
  'lastname' => 'Jonas'
];

$kuzzle = new Kuzzle('localhost');
$security = $kuzzle->security();

try {
  $user = $security->updateUser($kuid, $userDefinition);

  // $user instanceof User
}
catch (ErrorException $e) {

}
```

#### updateUser(id, content, [options], [callback])

Performs a partial update on an existing user.

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``id`` | string | Unique role identifier |
| ``content`` | JSON Object | A plain JSON object representing the user |
| ``options`` | string | (Optional) Optional arguments |
| ``callback`` | function | (Optional) Callback handling the response |

Available options:

| Filter | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

### Return value

Returns the `Security` object to allow chaining.

### Callback response

Resolves to an updated [User](#user) object

## user

```js
var userContent = {
  // A "profileIds" field is required to bind a user to an existing profile
  profileIds: ['some profile'],

  // The "local" authentication strategy requires a password
  password: 'secretPassword',

  // You can also set custom fields to your user
  firstname: 'John',
  lastname: 'Doe'
};

var user = kuzzle.security.user('myuser', userContent);
```

```java
JSONObject userContent = new JSONObject()
    // A "profileIds" field is required to bind a user to an existing profile
    .put("profileIds", new JSONArray().put('someProfile'))
    // The "local" authentication strategy requires a password
    .put("password", "a password")
    // You can also set custom fields to your user
    .put("firstname", "John")
    .put("lastname", "Doe");

User user = kuzzle.security.user("<kuid>", userContent);  
```

```php
<?php

use \Kuzzle\Kuzzle;
use \Kuzzle\Security\User;

$kuid = 'myUser';
$userDefinition = [
  // A "profileIds" field is required to bind a user to an existing profile
  'profileIds' => ['myProfile'],
  // The "local" authentication strategy requires a password
  'password' => 'secret',
  'firstname' => 'John',
  'lastname' => 'Doe'
];

$kuzzle = new Kuzzle('localhost');
$security = $kuzzle->security();

$user = $security->user($kuid, $userDefinition);
// $user instanceof User
```

Instantiates a new [User](#user) object.

### user(id, content)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``id`` | string | Unique user identifier |
| ``content`` | JSON Object | User content |

### Return value

Returns the new [User](#user) object.
