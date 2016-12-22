# ~ KuzzleUser

KuzzleUser is the object representation of an user, which is associated to a KuzzleProfile

## Constructors

```js
/*
 Constructors are not exposed in the JS/Node SDK.
 KuzzleUser objects are returned by KuzzleSecurity.userFactory method:
 */
 var userContent = {
   // A "profile" field is required to bind a user to an existing profile
   profileIds: ['admin'],

   // The "local" authentication strategy requires a password
   password: 'secretPassword',

   // You can also set custom fields to your user
   firstname: 'John',
   lastname: 'Doe'
 };

var user = kuzzle.security.userFactory('myuser', userContent);
```

```java
JSONObject userContent = new JSONObject()
  // A "profile" field is required to bind a user to an existing profile
  .put("profileIds", new JSONArray().put("admin"))
  // The "local" authentication strategy requires a password
  .put("password", "secret password")
  // You can also set custom fields to your user
  .put("firstname", "John")
  .put("lastname", "Doe");

// Using the KuzzleSecurity factory:
KuzzleUser user = kuzzle.security.userFactory("user ID", userContent);

// Or directly with the constructor:
KuzzleUser user = new KuzzleUser(kuzzle.security, "user ID", userContent);
```

```objective_c
NSDictionary* userContent = @{
  @"profileIds": @[@"admin"],
  @"password": @"secret password",
  @"firstname": @"John",
  @"lastname": @"Doe"
};

// Using the KuzzleSecurity factory:
KuzzleUser* user = [kuzzle.security userFactoryWithId: @"userId" content: userContent];

// Or directly with the constructor:
KuzzleUser* user = [[KuzzleUser alloc] initWithSecurity: kuzzle.security id: @"userId" content: userContent];
```

```swift
let userContent = [
  "profileIds": ["admin"],
  "password": "secret password",
  "firstname": "John",
  "lastname": "Doe"
]

// Using the KuzzleSecurity factory:
let user = kuzzle.security.userFactory(id: "userId", content: userContent)

// Or directly with the constructor:
let user = KuzzleUser(security: kuzzle.security, id: "userId", content: userContent)
```

```php
<?php

use \Kuzzle\Kuzzle;
use \Kuzzle\Security\User;

$userId = 'myUser';
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

// Using the Security factory
$user = $security->userFactory($userId, $userDefinition);

// Or directly with the constructor:
$user = new User($security, $userId, $userDefinition);
```

Instantiate a new KuzzleUser object.

### KuzzleUser(KuzzleSecurity, id, content)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``KuzzleSecurity`` | KuzzleSecurity | An instanciated KuzzleSecurity object |
| ``id`` | string | Unique user identifier |
| ``content`` | JSON Object | User content |

**Note:**  this constructor won't make any call to Kuzzle.

### Return value

Returns the `KuzzleUser` object.

## Properties

| Property name | Type | Description | get/set |
|--------------|--------|-----------------------------------|---------|
| `content` | JSON object | Raw user content | get |
| `id` | string | Unique profile identifier | get |

## delete

```js
// Using callbacks (NodeJS or Web Browser)
user
  .delete(function(error, result) {
    // result is the id of deleted user
  });

// Using promises (NodeJS)
user
  .deletePromise()
  .then((result) => {
    // result is the id of deleted user
  });
```

```java
user.delete(new KuzzleResponseListener<String>() {
  @Override
  public void onSuccess(String deletedId) {

  }

  @Override public void onError(JSONObject error) {

  }
});
```

```objective_c
NSError* error = nil;
[user deleteAndReturnError: &error callback:^(NSString * userId, NSError * error) {
  if(error) {
    // error occured
  }
  // everything went fine
}];

if(error) {
  // NSError reprsentation for KuzzleError.IllegalState, when Kuzzle state is .DISCONNECTED
}
```

```swift
do {
  try user.delete(callback: { result in
      switch result {
        case let .onError(error):
        // error occured during call, error is NSError
        break
        case let .onSuccess(success):
        // everything went fine, success is string with id of deleted KuzzleUser
        break
      }
  })
} catch {
  // KuzzleError.IllegalState, when Kuzzle state is .DISCONNECTED
}
```

```php
<?php

use Kuzzle\Security\User;

// ...

/*
 * @var $user User
 */

try {
  $user->delete();
}
catch (ErrorException $e) {
  // error occured
}
```

Deletes the user in Kuzzle

### delete([options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | (Optional) Callback handling the response |

Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

### Callback response

Resolves to a `String` containing the deleted user ID

## getProfiles

```js
for (profile of user.getProfiles()) {
  // profile can either be a profile ID if the object has not been hydrated,
  // or a KuzzleProfile object otherwise
}
```

```java
for(KuzzleProfile profile : user.getProfiles()) {
  // if this object has not been hydrated, the profile object has no content
}
```

```objective_c
for (KuzzleProfile* profile in [user getProfiles]) {
  // if this object has not been hydrated, the profile object has no content
}
```

```swift
for profile in user.getProfiles() {
    // if this object has not been hydrated, the profile object has no content
}
```

Returns this user associated profiles.

### Return value

Returns an array of associated profiles

## update

```js
var updateContent = {
  firstname: 'My Name Is',
  lastname: 'Jonas'
};

// Using callbacks (NodeJS or Web Browser)
user.update(updateContent, function(err, updatedUser) {
  // the updatedUser variable is the updated KuzzleUser object
})

// Using promises (NodeJS)
role
  .updatePromise(updateContent)
  .then(updatedUser => {
    // the updatedUser variable is the updated KuzzleUser object
  });
```

```java
JSONObject updateContent = new JSONObject()
  .put("firstname", "My Name Is")
  .put("lastname", "Jonas");

user.update(updateContent, new KuzzleResponseListener<KuzzleUser>() {
  @Override
  public void onSuccess(KuzzleUser updatedUser) {

  }

  @Override
  public void onError(JSONObject error) {

  }
});
```

```objective_c
NSError* error = nil;
NSDictionary* updatedContent = @{
                                 @"firstname": @"My Name Is",
                                 @"lastname": @"Jonas"
                                 };
[user updateWithContent: updatedContent error: &error callback:^(KuzzleUser * updatedUser, NSError * onError) {
  if(error) {
    // error occured
  }
  // everything went fine
}];

if(error) {
  // NSError reprsentation for KuzzleError.IllegalState, when Kuzzle state is .DISCONNECTED
}
```

```swift
let updatedContent = [
    "firstname": "My Name Is",
    "lastname": "Jonas"
]
do {
    user.update(content: updatedContent, callback: {result in
      switch result {
        case let .onError(error):
        // error occured during call, error is NSError
        break
        case let .onSuccess(success):
        // everything went fine, success is KuzzleUser
        break
      }
  })
} catch {
  // KuzzleError.IllegalState, when Kuzzle state is .DISCONNECTED
}
```

```php
<?php

use Kuzzle\Security\User;

// ...

/*
 * @var $user User
 */

$userContent = [
  'firstname' => 'My Name Is',
  'lastname' => 'Jonas'
];

try {
  $user->update($userContent);
}
catch (ErrorException $e) {
  // error occured
}
```

Performs a partial content update on this object.

### update(content, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``content`` | JSON Object | User content |
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Optional callback handling the response |

Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

### Return value

Returns the `KuzzleUser` object to allow chaining.

### Callback response

Resolves to the updated version of this object

## save

```js
// Using callbacks (NodeJS or Web Browser)
user
  .save(function(error, result) {
    // result is a KuzzleUser object
  });

// Using promises (NodeJS)
user
  .savePromise()
  .then((result) => {
    // result is a KuzzleUser object
  });
```

```java
user.save(new KuzzleResponseListener<KuzzleUser>() {
  @Override
  public void onSuccess(KuzzleUser user) {

  }

  @Override
  public void onError(JSONObject error) {

  }
});
```

```objective_c
NSError* error = nil;
[user saveAndReturnError: &error callback:^(KuzzleUser * savedUser, NSError * error) {
  if(error) {
    // error occured
  }
  // everything went fine
}];

if(error) {
  // NSError reprsentation for KuzzleError.IllegalState, when Kuzzle state is .DISCONNECTED
}
```

```swift
do {
  try user.save(callback: { result in
      switch result {
        case let .onError(error):
        // error occured during call, error is NSError
        break
        case let .onSuccess(success):
        // everything went fine, success is KuzzleUser
        break
      }
  })
} catch {
  // KuzzleError.IllegalState, when Kuzzle state is .DISCONNECTED
}
```

```php
<?php

use Kuzzle\Security\User;

// ...

/*
 * @var $user User
 */

try {
  $user->save();
}
catch (ErrorException $e) {
  // error occured
}
```

Create or replace the user in kuzzle

<aside class="warning">
Saving this object can rise an error if the associated profile is not created in Kuzzle
</aside>

### save([options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | (Optional) Callback handling the response |

Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

### Return value

Returns the `KuzzleUser` object to allow chaining.

### Callback response

Resolves to a `KuzzleUser` object.

## saveRestricted

```js
// Using callbacks (NodeJS or Web Browser)
user
  .saveRestricted(function(error, result) {
    // result is a KuzzleUser object
  });

// Using promises (NodeJS)
user
  .saveRestrictedPromise()
  .then((result) => {
    // result is a KuzzleUser object
  });
```

```java
user.saveRestricted(new KuzzleResponseListener<KuzzleUser>() {
  @Override
  public void onSuccess(KuzzleUser user) {

  }

  @Override
  public void onError(JSONObject error) {

  }
});
```

```php
<?php

use Kuzzle\Security\User;

// ...

/*
 * @var $user User
 */

try {
  $user->saveRestricted();
}
catch (ErrorException $e) {
  // error occured
}
```

Saves this user as restricted into Kuzzle.


### saveRestricted([options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | (Optional) Callback handling the response |

Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

### Return value

Returns the `KuzzleUser` object to allow chaining.

### Callback response

Resolves to a `KuzzleUser` object.


## setContent

```js
var user = kuzzle.security.getUser('myuser');
var userContent = {
  profileIds: ['profileId']
};

user = user.setContent(userContent);
```

```java
JSONObject newContent = new JSONObject()
  .put("profileIds", new JSONArray()
    .put("profileId")
  );

user.setContent(newContent);
```

```objective_c
NSDictionary* newContent = @{
  @"profileIds": @[
    @"profileId"
  ]
};
[user setContentWithData: newContent];
```

```swift
let newContent = [
  "profileIds": [
    "profileId"
  ]
]

user.setContent(content: newContent)
```

```php
<?php

use Kuzzle\Security\User;

// ...

$userContent = [
  'profileIds' => ['profileId']
];

/*
 * @var $user User
 */
$user->setContent($userContent);
```

<aside class="note">
Updating an user will have no impact until the <code>save</code> method is called
</aside>

Replaces the content of KuzzleUser

### setContent(data)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``data`` | JSON Object |  User content |

### Return value

Returns the `KuzzleUser` object.


## setProfiles

```js
var profile = kuzzle.security.getProfile('myprofile', function(error, profile) {
  // Can set the profiles directly with a KuzzleProfile object
  user.setProfiles([profile]);
});

// Or by passing their ids
user.setProfiles(['myprofile']);
```

```java

// Updating the profile with a KuzzleProfile object
kuzzle
  .security
  .getProfile("myprofile", opts, new KuzzleResponseListener<KuzzleProfile>() {
    @Override
    public void onSuccess(KuzzleProfile profile) {

      ArrayList<KuzzleProfile> profileIds = new ArrayList<KuzzleProfile>();
      profileIds.add(profile);

      user.setProfiles(profileIds);

    }
  });

// Updating the profile with a profile ID
ArrayList<String> profileIds = new ArrayList<String>();
profileIds.add("myprofile");

user.setProfiles(profileIds);
```

```objective_c
// Updating the profile with a KuzzleProfile object
[kuzzle.security getProfileWithId: @"myprofile" options: opts error: &error callback:^(KuzzleProfile * profile, NSError * error) {

  [user setProfilesWithProfile: @[profile]];

}];

// Updating the profile with a profile ID
[user setProfilesWithId: @[@"profileId"]];
```

```swift

do {
  try kuzzle.security.getProfile(id: "myprofile", callback: { result in
      switch result {
        case let .onSuccess(profile):

        user.setProfiles(withProfiles: [profile])

        break
      }
  })
} catch {
  // error occured
}

// Updating the profile with a profile ID
user.setProfiles(withIds: ["profileId"])
```

```php
<?php

use Kuzzle\Security\Profile;
use Kuzzle\Security\User;

// ...

$profile = $kuzzle->security->getProfile('myProfile');

/*
 * @var $user User
 */

// Updating the profile with a Profile object
$user->setProfiles([$profile]);

// Updating the profile with a profile ID
$user->setProfiles(['myProfile']);
```

<aside class="note">
Updating an user will have no impact until the <code>save</code> method is called
</aside>


Replace the profile associated to the user

### setProfiles(profileIds)

### setProfiles(kuzzleProfile)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``profileIds`` | array | List of profile ID |
| ``kuzzleProfile`` | array | An array of instanciated KuzzleProfile object |

### Return value

Returns the `KuzzleUser` object.


## addProfile

```js
var profile = kuzzle.security.getProfile('myprofile', function(error, profile) {
  // Can add a profile directly with a KuzzleProfile object
  user.addProfile(profile);
});

// Or by passing an id
user.addProfile('myprofile');
```

```java

// Updating the profile with a KuzzleProfile object
kuzzle
  .security
  .getProfile("myprofile", opts, new KuzzleResponseListener<KuzzleProfile>() {
    @Override
    public void onSuccess(KuzzleProfile profile) {
      // Can add the profile directly with a KuzzleProfile object
      user.addProfile(profile);
    }
  });

// Updating the profile with a profile ID
user.addProfile("myprofile");
```

```objective_c
// Updating the profile with a KuzzleProfile object
[kuzzle.security getProfileWithId: @"myprofile" options: opts error: &error callback:^(KuzzleProfile * profile, NSError * error) {

  [user addProfileWithProfile: profile];

}];

// Updating the profile with a profile ID
[user addProfileWithId: @"profileId"];
```

```swift

do {
  try kuzzle.security.getProfile(id: "myprofile", callback: { result in
      switch result {
        case let .onSuccess(profile):

        user.addProfile(withProfile: profile)

        break
      }
  })
} catch {
  // error occured
}

// Updating the profile with a profile ID
user.addProfile(withIds: "profileId")
```

```php
<?php

use Kuzzle\Security\Profile;
use Kuzzle\Security\User;

// ...

$profile = $kuzzle->security->getProfile('myProfile');

/*
 * @var $user User
 */

// Updating the profile with a Profile object
$user->addProfile($profile);

// Updating the profile with a profile ID
$user->addProfile('myProfile');
```

<aside class="note">
Updating an user will have no impact until the <code>save</code> method is called
</aside>


Replace the profile associated to the user

### addProfile(profileId)

### addProfile(kuzzleProfile)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``profileId`` | string | Profile ID |
| ``kuzzleProfile`` | kuzzleProfile | An instanciated KuzzleProfile object |

### Return value

Returns the `KuzzleUser` object.
