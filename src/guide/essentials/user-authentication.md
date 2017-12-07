---
layout: full.html
algolia: true
title: User authentication
order: 750
---

# User authentication

Once [roles and profiles]({{ site_base_path }}guide/essentials/security) have been set, you can create users and allow them to authenticate themselves in different ways.

## Perform a basic login

The most simple way you can login to Kuzzle is via the `local` strategy, using the SDK. We'll use the NodeJS SDK here, but the process is similar for other languages.

If you have no users in your Kuzzle Backend yet, you can read the documentation on [how to configure it for security]({{ site_base_path }}guide/essentials/security), or [create your first administrator using the backoffice](http://kuzzle-backoffice.netlify.com) (you don't even have to install it, it's available online).

Create a `login.js` file, NPM-install the Kuzzle SDK and start coding:

```javascript
const Kuzzle = require('kuzzle-sdk')

const kuzzle = new Kuzzle('localhost')

kuzzle
  .connectPromise()
  .then(() => loginPromise('local', {username: '<username>', password: '<password>'})
  .then(() => {
    console.log('logged!')
  })
  .catch(err => {
    console.error(err.message)
  })
```

The code above does the following:

* loads the `Kuzzle` SDK from the NPM package,
* instantiates a new SDK object
* connects it to a remote Kuzzle server
* performs a login with the provided username and password

---

## Authentication strategy

An authentication strategy is a mean for users to authenticate themselves to Kuzzle. There are many ways to do it: OAuth (facebook, google, github, ...), kerberos, salesforce, and many, many others.  
Kuzzle is able to support multiple authentication strategies, and users may have multiple ways to authenticate themselves.

By default, Kuzzle is shipped with the `local` strategy, which is a simple but secure login/password authentication strategy.

If this strategy doesn't fit your needs, you can use the [Oauth authentication plugin](https://github.com/kuzzleio/kuzzle-plugin-auth-passport-oauth), or you can develop your own strategy (see [Plugin documentation]({{ site_base_path }}plugins-reference/plugins-features/adding-authentication-strategy) for more details).

---

## Credentials

A user's credentials are simply a list of allowed authentication strategies *for this user*, with this user's personal informations attached to each strategy.

For instance, consider a Kuzzle server having the following available strategies: local, facebook, azure, saml and twitter.
If a user registered to this Kuzzle with, say, facebook and twitter, then their credentials may look like this:

```json
{
  "facebook": {
    "kuid": "<Kuzzle Unique User Identifier>",
    "login": "<login name>",
    "email": "johndoe@foobar.qux"
  },
  "twitter": {
    "kuid": "<Kuzzle Unique User Identifier>",
    "login": "<login name>",
    "avatar_url": "http://..."
  }
}
```

You may have noticed the presence of a `kuid` field in both credentials. More explanation about that field in the following chapters.

---

## User creation

Users can be created either using the [back-office]({{ site_base_path }}guide/essentials/running-backoffice), [Kuzzle API]({{ site_base_path }}api-documentation/controller-security/create-user/), or a [Kuzzle SDK]({{ site_base_path }}sdk-reference/security/create-user/).

When creating a user, you have to assign one or more [profiles]({{ site_base_path }}guide/essentials/security/#profile-definition) to it, defining its permissions.

You may also provide:

* A list of [credentials]({{ site_base_path }}guide/essentials/user-authentication/#credentials). If no credentials are provided, then this user cannot [log in]({{ site_base_path }}api-documentation/controller-auth/login/)
* Additional user global informations. Those can be anything, from a lastname to a list of hobbies. There is no limitation, and these informations are global to this user, meaning that these are not linked to a particular authentication strategy

---

## Kuzzle User Identifier (kuid)

When a user is created, Kuzzle assigns a random unique identifier to it, called the `kuid`.  
This unique identifier is then provided to authentication plugins when new credentials are added to the user. It's the responsibility of authentication plugins to link their own user identifier (be it a login, email or whatever) to the corresponding `kuid`.

This system allows a user to log in to Kuzzle using different strategies and, potentially, different login identifiers, while still being considered as an unique entity by Kuzzle.

If you're interested for a more in-depth explanation on how all of this work, then please check our [Kuzzle In-Depth Documentation]({{ site_base_path }}guide/kuzzle-depth/authentication/#the-kuzzle-user-identifier-kuid).

---

## User authentication

Once a user has been created, and configured with a list of profiles and credentials, then they can send [an authentication request]({{ site_base_path }}api-documentation/controller-auth/login) in order to log in to Kuzzle, selecting one of their allowed authentication strategies.

If the authentication plugin accepts the request, then Kuzzle creates a [JSON Web Token](https://tools.ietf.org/html/rfc7519) and send it back to the user.

This token must then be [appended to all subsequent requests]({{ site_base_path }}api-documentation/query-syntax/authorization-token/#authorization-token). 
