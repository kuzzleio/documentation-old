---
layout: full.html
algolia: true
title: Configure Security
order: 700
---

# Configuring Security

Kuzzle Backend provides a full set of functionalities to configure fine-grained permissions to your data.

---

## Initial Setup

When Kuzzle Backend is first installed there is no administrator account and anonymous users (i.e. unauthenticated users) have administrative privileges.

To secure your Kuzzle Backend installation you will need to create an administrator account by either using the [Kuzzle Console]({{ site_base_path }}guide/essentials/running-console/#create-an-admin-account ) or using the [CLI]({{ site_base_path }}guide/essentials/cli/#createfirstadmin) tool.  

Once the administrator account is created, you can remove anonymous access rights and properly secure your installation. You can then use the Kuzzle Console or Kuzzle API to create new users and assign them permissions.

---

## User Permissions

User-level permissions control what data a specific user or set of users has access to, and what actions they can perform on that data.

### Users, Profiles and Roles

Kuzzle Backend's security engine links `users` to one or more `profiles`.  
You can think of a `profile` as a group of users that share the same permissions.

The `profiles` themselves are made up of different groups of permissions, these groups are called `roles`.

A `profile` is linked to a set of `roles`, and each `role` defines a set of permissions. For example, in the diagram below, the *editor* profile is has all permissions, the *contributor* has a subset of the permissions, and the *default* profile has only default permissions:

![Users, Profiles and Roles]({{ site_base_path }}assets/images/permissions/profiles-roles.png)

All `roles` and `profiles` can be edited in the [Kuzzle Console]({{ site_base_path }}guide/essentials/installing-console).

---

## Defining Roles

A `role` can be defined using a hierarchical JSON object where permissions are outlined by `controller` and `action`.

The `role` definition is represented as a Javascript object where each key at the root of the object identifies a `controller` by name:

```js
var myRoleDefinition = {
  controllers: {
    < controller|* >: {
      actions: {
        < action|* >: < action permission|* >,
        < action|* >: < action permission|* >,
        ...
      }
    }
  }
};
```

The `controllers` and `actions` properties can be set to a specific value or to the wildcard value "&#42;".

When `controller` is declared within a Plugin, its name must be prefixed with the name of the Plugin, like `< plugin-name/controller-name >`.

The `action permission` value can be set to either:

- a boolean. If `true`, the `role` allows the given action.
- an object describing a dynamic right definition. For more information check out the [advanced roles documentation]({{ site_base_path }}guide/kuzzle-depth/roles-definitions)).

As an example, below is the `role` definition that Kuzzle Backend uses to request authorization from the anonymous user once the administrator account is created and anonymous access is blocked.

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

In the above `role` definition, anonymous users can perform the `login`, `checkToken` and `getCurrentUser` actions of the `auth` controller.

For a list of available controllers and actions from the Kuzzle Backend API by sending a `GET` request as follows:

```bash
curl -X GET http://localhost:7512/\?pretty\=true
```

---

## Defining Profiles

A `profile` definition is a Javascript object that contains an array of policies, each composed of a roleId and an array of restrictions:

```js
var myProfileDefinition = {
  policies: [
    {
      roleId: "< role Id >",
      restrictedTo: [
        {
          index: "< some index >",
          collections: [
            "< a collection >",
            "< another collection >"
          ]
        },
        ...
      ]  
    },
    <another role>,
    ...
  ]
};
```

When applying a role to a profile, the role can be applied to all indexes and collections or it can be applied to a specific index or collection.

For example, if we have a "publisher" role which allows any action on the `document` controller:

```js
var publisherRole = {
  controllers: {
    document: {
      actions: {
        '*': true
      }
    }
  }
};
```

Then we can declare three different profiles using this same role, each with varying levels of access based on the index and collection:

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

These three profiles will provide the following restrictions:

* users with `profile1` are allowed to use all `document` controller actions on all indexes and collections.
* users with `profile2` are only allowed to use `document` controller actions on collections stored in index `index1`.
* users with `profile3` are only allowed to use `document` controller actions on:
  * all collections stored in index `index2`
  * collections `foo` and `bar` stored in index `index1`.

---

## Composing Rules

In Kuzzle Backend, permissions follow the [Whitelist](https://en.wikipedia.org/wiki/Whitelist) strategy, which means that **an action must be explicitly allowed** by at least one role of the user profile.

This means that:

* If a role allows it, the action is authorized, *even if another role denies it*.
* If no role explicitly allows it, the action is denied, even if no role explicitly denies it.

### Action Permissions

So far, we've seen how to set permissions based on the user profile. Now, let's say we have a chat application and we want the users to only be able to edit & delete their own messages.

**This type of rules depends on the context and cannot be expressed as a simple boolean**.

Kuzzle Backend lets you define these complex permissions using custom functions, which determine if a user has access to a particular resource depending on the context.

In our chat example, a complex rule can be expressed as follows:

```js
var role = {
  controllers: {
    write: {
      actions: {
        create: true,
        delete: {
          args: {
            document: {
              index: "$request.input.resource.index",
              collection: "$request.input.resource.collection",
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

For more details, please refer to the [Core Documentation]({{ site_base_path }}guide/kuzzle-depth/roles-definitions)
