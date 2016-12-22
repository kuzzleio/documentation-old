# ~ KuzzleProfile

KuzzleProfile is the object representation of a profile, which is a set of one or many KuzzleRole objects.


## Constructors

```js
/*
 Constructors are not exposed in the JS/Node SDK.
 KuzzleProfile objects are returned by KuzzleSecurity.profileFactory method:
 */
var profileDefinition = {
  policies: [
    {roleId: 'myrole'},
    {roleId: 'default', restrictedTo: [{index: 'index1'}, {index: 'index2', collections: ['foo', 'bar'] } ] }
  ]
};

var role = kuzzle.security.profileFactory('myprofile', profileDefinition);
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
JSONObject roles = new JSONObject()
  .put("policies", new JSONArray()
    .put(policy1)
    .put(policy2)
  );

KuzzleProfile profile = new KuzzleProfile(kuzzle.security, "profileId", roles);
```

```objective_c
NSDictionary* profileContent = @{
  @"policies": @[
    @{"roleId": @"myrole"},
    @{"roleId": @"default", "restrictedTo": @[@{"index": @"index1"}]}
  ],
};

// Using the KuzzleSecurity factory:
KuzzleProfile* profile = [kuzzle.security profileFactoryWithId: @"profileId" content: profileContent];

// Or directly with the constructor:
KuzzleProfile* profile = [[KuzzleProfile alloc] initWithSecurity: kuzzle.security id: @"profileId" content: profileContent];
```

```swift
let profileContent = [
  "policies": [
    {"roleId": 'myrole'},
    {"roleId": 'default', "restrictedTo": [{"index": 'index1'}, {"index": 'index2', "collections": ["foo", "bar"] } ] }
  ]
]

// Using the KuzzleSecurity factory:
let profile = kuzzle.security.profileFactory(id: "profileId", content: profileContent)

// Or directly with the constructor:
let profile = KuzzleProfile(security: kuzzle.security, id: "profileId", content: profileContent)
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


// Using the Security factory:
$profile = $security->profileFactory($profileId, $profileDefinition);

// Or directly with the constructor:
$profile = new Profile($security, $profileId, $profileDefinition);
```

Instantiates a new `KuzzleProfile` object.

### KuzzleProfile(KuzzleSecurity, id, content)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``KuzzleSecurity`` | KuzzleSecurity | An instanciated KuzzleSecurity object |
| ``id`` | string | Unique profile identifier |
| ``content`` | JSON Object | Profile content |

**Note:**  this constructor won't make any call to Kuzzle.

### Return value

Returns to the `KuzzleProfile` object.

## Properties

| Property name | Type | Description | get/set |
|--------------|--------|-----------------------------------|---------|
| `content` | JSON object | Raw profile content | get |
| `id` | string | Unique profile identifier | get |

## addPolicy

```js
// Passing a KuzzlePolicy object
var policy = profile.policyFactory({
  'roleId': 'some role id',
  'restrictedTo': [{index: 'index1'}, {index: 'index2', collections: ['foo', 'bar'] } ]
})
profile.addPolicy(policy);

// Or by passing its description
profile.addPolicy({
  'roleId': 'some role id',
  'restrictedTo': [{index: 'index1'}, {index: 'index2', collections: ['foo', 'bar'] } ]
});
```

```java
KuzzlePolicy policy = new KuzzlePolicy(profile, 'some role id', )
profile.addRole("a role ID");

// you may also add a KuzzleRole object directly
profile.addRole(kuzzle.security.getRole("another role ID"));
```

```objective_c
[profile addRoleWithId: @"roleId"];

// you may also add a KuzzleRole object directly
KuzzleRole* role = [[KuzzleRole alloc] initWithSecurity: kuzzle.security id: @"roleId" content: @{}];
[profile addRoleWithRole: role];
```

```swift
profile.addRole(id: "roleId")

// you may also add a KuzzleRole object directly
let role = KuzzleRole(security: kuzzle.security, id: "roleId", content: ["":""])
profile.addRole(role: role)
```

Adds a role to the profile.

<aside class="note">
Updating a profile will have no impact until the <code>save</code> method is called
</aside>

### addPolicy(id)

### addPolicy(policy)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``id`` | string | Unique id corresponding to the new associated role |
| ``policy`` | KuzzlePolicy | policy instance corresponding to the new associated role and its restrictions |

### Return value

Returns the `KuzzleProfile` object to allow chaining calls.


## delete

```js
// Using callbacks (NodeJS or Web Browser)
profile
  .delete(function(error, result) {
    // result is the id of deleted profile
  });

// Using promises (NodeJS)
profile
  .deletePromise()
  .then((result) => {
    // result is the id of deleted profile
  });
```

```java
profile
  .delete(new KuzzleResponseListener<String>() {
    @Override
    public void onSuccess(String deleteId) {

    }

    @Override
    public void onError(JSONObject error) {

    }
  });
```

```objective_c
NSError* error = nil;
[profile deleteAndReturnError: &error callback:^(NSString * profileId, NSError * error) {
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
  try profile.delete(callback: { result in
      switch result {
        case let .onError(error):
        // error occured during call, error is NSError
        break
        case let .onSuccess(success):
        // everything went fine, success is string with id of deleted KuzzleProfile
        break
      }
  })
} catch {
  // KuzzleError.IllegalState, when Kuzzle state is .DISCONNECTED
}
```

```php
<?php

use Kuzzle\Security\Profile;

// ...

/*
 * @var $profile Profile
 */
try {
  $profile->delete();
}
catch(ErrorException $e) {
  // error occured
}
```

Deletes this profile from Kuzzle.

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

Resolves to the id of deleted profile.

## getPolicies

```js
for (policy of profile.getPolicies()) {
  // policy is a KuzzlePolicy object
}
```

```java
for(KuzzlePolicy policy : profile.getPolicies()) {
  // policy is a KuzzlePolicy object
}
```

```objective_c
for (KuzzlePolicy* policy in [profile getPolicies]) {
  // policy is a KuzzlePolicy object
}
```

```swift
for policy in profile.getPolicies() {
  // policy is a KuzzlePolicy object
}
```

```php
<?php

use Kuzzle\Security\Profile;
use Kuzzle\Security\Policy;

// ...

/*
 * @var $profile Profile
 */
foreach($profile->getPolicies() as $policy) {
  // $policy instanceof Policy
}
```

Returns this profile associated roles.

### Return value

An array of associated roles

## update

```js
var updateContent = {
  policies: [
    {roleId: 'myrole'},
  ]
};

// Using callbacks (NodeJS or Web Browser)
profile.update(updateContent, function(err, updatedProfile) {
  // the updatedProfile variable is the updated KuzzleProfile object
})

// Using promises (NodeJS)
role
  .updatePromise(updateContent)
  .then(updatedProfile => {
    // the updatedProfile variable is the updated KuzzleProfile object
  });
```

```java
JSONObject policy1 = new JSONObject()
  .put("roleId", "myrole");

JSONObject updateContent = new JSONObject()
  .put("policies", new JSONArray()
    .put(policy1)

user.update(updateContent, new KuzzleResponseListener<KuzzleProfile>() {
  @Override
  public void onSuccess(KuzzleProfile updatedProfile) {

  }

  @Override
  public void onError(JSONObject error) {

  }
});
```

```objective_c
NSError* error = nil;
NSDictionary* updatedContent = @{
  @"policies": @[
    @{"roleId": @"myrole"},
  ],
};

[profile updateWithContent: updatedContent error: &error callback:^(KuzzleProfile * updatedProfile, NSError * onError) {
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
  "policies": [
    {"roleId": 'myrole'},
  ]
]

do {
    user.update(content: updatedContent, callback: {result in
      switch result {
        case let .onError(error):
        // error occured during call, error is NSError
        break
        case let .onSuccess(success):
        // everything went fine, success is KuzzleProfile
        break
      }
  })
} catch {
  // KuzzleError.IllegalState, when Kuzzle state is .DISCONNECTED
}
```

Performs a partial content update on this object.

### update(content, [options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``content`` | JSON Object | Profile content |
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Optional callback handling the response |

Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

### Return value

Returns the `KuzzleProfile` object to allow chaining.

### Callback response

Resolves to the updated version of this object


## save

```js
var profileDefinition = {
  policies: [
    {roleId: 'myrole'},
    {roleId: 'default', restrictedTo: [{index: 'index1'}, {index: 'index2', collections: ['foo', 'bar'] } ] }
  ]
};

var profile = kuzzle.security.profileFactory('myprofile', profileDefinition);

// Using callbacks (NodeJS or Web Browser)
profile
  .save(function(error, result) {
    // result is a KuzzleProfile object
  });

// Using promises (NodeJS)
profile
  .savePromise()
  .then((result) => {
    // result is a KuzzleProfile object
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

JSONObject roles = new JSONObject()
  .put("policies", new JSONArray()
    .put(policy1)
    .put(policy2)
  );

KuzzleProfile profile = kuzzle.security.profileFactory("myprofile", roles);

profile.save(new KuzzleResponseListener<KuzzleProfile>() {
  @Override
  public void onSuccess(KuzzleProfile savedProfile) {

  }

  @Overrid public void onError(JSONObject error) {

  }
});
```

```objective_c
NSError* error = nil;
[profile saveAndReturnError: &error callback:^(KuzzleProfile * savedProfile, NSError * error) {
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
  try profile.save(callback: { result in
      switch result {
        case let .onError(error):
        // error occured during call, error is NSError
        break
        case let .onSuccess(success):
        // everything went fine, success is KuzzleProfile
        break
      }
  })
} catch {
  // KuzzleError.IllegalState, when Kuzzle state is .DISCONNECTED
}
```

```php
<?php

use Kuzzle\Security\Profile;

// ...

/*
 * @var $profile Profile
 */

try {
  $profile = $profile->save();

  // $profile instanceof Profile
}
catch (ErrorException $e) {
  // error occured
}
```

Creates or replaces the profile in Kuzzle.

<aside class="warning">
Saving the object will rise an error if the bound roles have not been previously created in Kuzzle.
</aside>

### save([options], [callback])

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``options`` | JSON Object | Optional parameters |
| ``callback`` | function | Callback handling the response |

Available options:

| Option | Type | Description | Default |
|---------------|---------|----------------------------------------|---------|
| ``queuable`` | boolean | Mark this request as (not) queuable | ``true`` |

### Return value

Returns the `KuzzleProfile` object to allow chaining.

### Callback response

Resolves to a `KuzzleProfile` object.


## setContent

<aside class="note">
Updating a profile will have no impact until the <code>save</code> method is called
</aside>

```js
var profile = kuzzle.security.getProfile('myprofile');
var profileDefinition = {
  policies: [
    {roleId: 'myrole'},
    {roleId: 'default', restrictedTo: [{index: 'index1'}, {index: 'index2', collections: ['foo', 'bar'] } ] }
  ]
};

profile = profile.setContent(profileDefinition);
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

profile.setContent(newRolesList);
```

```objective_c
NSDictionary* newContent = @{
  @"policies": @[
    @{"roleId": @"myrole"},
    @{"roleId": @"default", "restrictedTo": @[@{"index": @"index1"}]}
  ],
};
[profile setContentWithData: newContent];
```

```swift
let newContent = []
  "policies": [
    {"roleId": 'myrole'},
    {"roleId": 'default', "restrictedTo": [{"index": 'index1'}, {"index": 'index2', "collections": ["foo", "bar"] } ] }
  ]
]

profile.setContent(content: newContent)
```

```php
<?php

use Kuzzle\Security\Profile;

// ...

$profileDefinition = [
  'policies' => [
    [
      'roleId' => 'anonymous',
      'restrictedTo' => [
        ['index' => 'my-second-index', 'collection' => ['my-collection']]
      ]
    ]
  ]
];

/*
 * @var $profile Role
 */
$profile->setContent($profileDefinition);
```

Replaces the content of the `KuzzleProfile` object.

### setContent(data)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``data`` | JSON Object | Profile content |

### Return value

Returns the `KuzzleProfile` object.


## setPolicies

<aside class="note">
Updating a profile will have no impact until the <code>save</code> method is called
</aside>

```js
policy = profile.policyFactory({
  "roleId": "roleId"
});

// Replaces the profile policies set with the given entry.
// The entry can be an array of KuzzlePolicy objects, an array of policy definition or a mix of the two.
profile.setPolicies([policy, {'roleId': 'default'}]);
```

```java
KuzzleRole
  policy1 = profile.policyFactory("role1 ID", new JSONObject()),
  policy2 = profile.policyFactory("role2 ID", new JSONObject()),
  policy3 = profile.policyFactory("role3 ID", new JSONObject());

// Binding policy objects to a profile
profile.setPolicies({policy1, policy2, policy3});

// Binding policy definition to a profile
profile.setPolicies({
  new JSONObject().put('roleId', 'role1 ID'),
  new JSONObject().put('roleId', 'role2 ID'),
  new JSONObject().put('roleId', 'role3 ID')
});
```

```objective_c
KuzzlePolicy* policy1 = [profile policyFactoryWithId: @"role1Id" content: @{}];
KuzzlePolicy* policy2 = [profile policyFactoryWithId: @"role2Id" content: @{}];
KuzzlePolicy* policy3 = [profile policyFactoryWithId: @"role3Id" content: @{}];

// Binding role objects to a profile
[profile setPoliciesWithPolicies: @[policy1, policy2, policy3]];

// Binding role IDs to a profile
[profile setPoliciesWithPoliciesDescription: @[@{"roleId": @"role1Id"}, @{"roleId": @"role2Id"}, @{"roleId": @"role3Id"}]];
```

```swift
let policy1 = profile.policyFactory(roleId: "role1Id", content: ["":""])
let policy2 = profile.policyFactory(roleId: "role2Id", content: ["":""])
let policy3 = profile.policyFactory(roleId: "role3Id", content: ["":""])

// Binding role objects to a profile
profile.setPolicies(withPolicies: [policy1, policy2, policy3])

// Binding role IDs to a profile
profile.setPolicies(withPoliciesDescription: [{"roleId", "role1Id"}, {"roleId", "role2Id"}, {"roleId", "role3Id"}])
```

Replaces the roles associated to the profile.

### setPolicies(policyDescriptionArray)

### setPolicies(kuzzlePolicyArray)

| Arguments | Type | Description |
|---------------|---------|----------------------------------------|
| ``policyDescriptionArray`` | array of object | Descriptions of policy to add |
| ``kuzzlePolicyArray`` | array of `KuzzlePolicy` objects | `KuzzlePolicy` objects to add |

### Return value

Returns the `KuzzleProfile` object.
