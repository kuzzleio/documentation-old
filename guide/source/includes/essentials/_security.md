## Security

Kuzzle provides a full set of functionalities to finely define the permissions for your data.

### Fresh installation default rights.

When installing Kuzzle for the very first time, no default user is created and the Anonymous user is allowed to perform any action on the data. The only restriction is on the internal data storage used by Kuzzle to store its configuration.

Once a first admin user is created, either by accessing [Kuzzle Back Office](https://github.com/kuzzleio/kuzzle-bo) for the first time or by using the [CLI](#command-line-interface), the Anonymous permissions are dropped.

You can then use the Back Office to administrate your user rights.

### Authentication

The first step to secure your data is to be able to identify your users.
Kuzzle ships by default with a local login/password strategy.

You can also use Kuzzle's [Oauth authentication plugin](https://github.com/kuzzleio/kuzzle-plugin-auth-passport-oauth), or develop your own (see [Core documentation](#authentication-process) for more details).

If the authentication request resolves an existing user, Kuzzle generates a [JSON Web Token](https://tools.ietf.org/html/rfc7519) that should be used in subsequent requests.

(see also Kuzzle API documentation about [Auth Controller](/api-reference/#login) and [JWT token usage](/api-reference/#authorization-header) in Kuzzle requests)


### Permissions

Once you know who is connected, you need a way to attach your users some permission policies to control their access to data.

#### Users, profiles and roles

Kuzzle associates `users` to a `profile`.  
You can think to a `profile` as a user group. All the `users` that share the same `profile` will get the same accesses.

Because some sets of permissions can be shared between several `profiles`, Kuzzle includes an additional level of abstraction below the `profile`: the `roles`.

A `profile` is a set of `roles`. Each `role` defines a set of permissions.

![Users, profiles and roles](./images/permissions/profiles-roles.png)

In the simple example above, the *editor* profile is a superset of the *contributor* one, which, in turn, extends the *default* profile.

`roles` and `profiles` can be edited in [Kuzzle Back Office](https://github.com/kuzzleio/kuzzle-bo).

#### Role definition

A `role` definition is a hierarchical JSON object in which permissions can be defined at `controller` and `action` level.

The `role` definition is represented as a hierarchical object for one or more `controllers`.

```js
var myRoleDefinition = {
  controllers: {
    < controller|* >: {
      actions: {
        < action|* >: < action permission* >,
        < action|* >: < action permission* >,
        ...
      }
    }
  }
};
```

Each entry of the `controllers`, `actions` tree can be set to either an explicit value or the "&#42;" wildcard.

The `action permission` value can be set either to:

- a boolean. When set to `true`, the user is allowed to perform the action.
- an object that describes a function (more about it in the [action permissions functions section](#actions-permissions-functions)).

example:

```js
var anonymousRole = {
    controllers: {
    auth: {
      actions: {
        login: true,
        checkToken: true,
        getCurrentUser: true
      }
    }
  }
};
```

The example above is the permission definition set by Kuzzle for the Anonymous user after the first admin user has been created.

In this example, the role denies every action to the user, except the `login`, `checkToken` and `getCurrentUser` actions of the `auth` controller.

#### Profile definition

A `profile` definition is a hierarchical JSON object that contains an array of roles, identified by their IDs:

```js
var myProfileDefinition = {
  roles: [
    {_id: < role Id > (, restrictedTo: < role restrictions > ) },
    <another role>,
    ...
  ]
};
```

A role can be applied globally on the profile, or it can be restricted to a list of indexes or index/collections pairs.

For example, if we have a "publisher" role which allows to request any action of the `write` controller:

```js
var publisherRole = {
    controllers: {
    write: {
      actions: {
        '*': true
      }
    }
  }
};
```

Then we declare 3 profiles using this role:

```js
var profile1 = {
  roles: [ {_id: 'publisherRole' } ]
};

var profile2 = {
  roles: [
    {
      _id: 'publisherRole',
      restrictedTo: [{index: 'index1'}]
    }
  ]
};

var profile3 = {
  roles: [
    {
      _id: 'publisherRole',
      restrictedTo: [
        {index: 'index1', collections: ['foo', 'bar']},
        {index: 'index2'}
      ]
    }
  ]
};
```

With this sample profiles:

* users with `profile1` are allowed to use all `write` controller actions on all indexes and collections.
* users with `profile2` are only allowed to use `write` controller actions on collections stored in index `index1`.
* users with `profile3` are only allowed to use `write` controller actions on:
  * all collections stored in index `index2`
  * collections `foo` and `bar` stored in index `index1`.

##### Composition rules

In Kuzzle, permissions follow the [Whitelist](https://en.wikipedia.org/wiki/Whitelist) strategy:

An action must be **explicitly** allowed by at least one role of the user profile (including restrictions).

That means:
* If a role allows it, the action is authorized, even if another role denies it.
* If no role explicitly allows it, the action if denied, even if no role explicitly denies it as well.

#### Actions permissions functions

So far, we've seen how to set permissions based on the user profile only.

Now, let's say we have a chat application and want the users to be allowed to edit & delete their own messages only.

This type of rules depends on the context and cannot be expressed as a simple boolean.

Kuzzle lets you define more complex permissions using custom functions, allowing dynamic decision about whether the user is allowed to proceed or not, depending on the context.

In our chat example, the rule can be expressed as:

```js
var role = {
  controllers: {
    write: {
      actions: {
        create: true,
        delete: {
          args: {
            document: {
              index: "$requestObject.index",
              collection: "$requestObject.collection",
              action: {
                get: "$currentId"
              }
            }
          },
          test: "return args.document.content.user.id === $currentUserId"
        }
      }
    }
  }
};
```

See more details at [Core documentation section](#permission-closures)