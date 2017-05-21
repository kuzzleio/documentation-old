---
layout: full.html
algolia: true
title: Authentication
order: 100
---

# Authentication

Kuzzle uses [PassportJS](http://PassportJS.org/) to enable authentication through a large amount of providers, for example:

- local username/password authentication (enabled by default)
- OAuth2 providers like GitHub or google (using [Oauth plugin](https://GitHub.com/kuzzleio/kuzzle-plugin-auth-passport-oauth))
- SAML providers

Remember the [Architecture overview]({{ site_base_path }}guide/kuzzle-depth) and focus on the components involved by reading actions:
![read_scenario_http_overview]({{ site_base_path }}assets/images/request-scenarios/auth/overview.png)

Kuzzle uses the following internal components during the authentication process:

* The Auth Controller.
* The Passport Wrapper, which acts as an interface between Kuzzle controllers and the Passport library,
* The User and Token [Repositories](https://GitHub.com/kuzzleio/kuzzle/tree/master/lib/api/core/models/repositories), to retrieve users' data.
* The Authentication strategy, implemented within a dedicated plugin.

---

## The Kuzzle User Identifier (kuid)

The kuzzle user identifier is a string that identifies a kuzzle user uniquely. It is used internally to link the user stored in Kuzzle with its credentials within the different authentication strategies.

When a user is created, this identifier can either be set by the request, or generated directly by Kuzzle.

When an authentication strategy stores its credentials in its own storage (internal or external) with its own storage nomenclature they have to store a reference to this value. This way it can retrieve the Kuzzle user identifier when the user credentials are provided during a log in request.

---

### Example - Local Strategy

The "Local" strategy (implemented by the [Passport Local Plugin](https://GitHub.com/kuzzleio/kuzzle-plugin-auth-passport-local)) authenticates a user via a username/password pair (locally stored).

![auth_scenario_details_local]({{ site_base_path }}assets/images/request-scenarios/auth/details-local.png)

* The user calls the `login` action of the Auth Controller:

```javascript
{
  "controller": "auth",
  "action": "login",
  "body": {
    "strategy": "local",
    "username": "<my_username>",
    "password": "<my_password>"
  }
}
```

* The Auth Controller calls the `authenticate()` method of the Passport Wrapper which formats and sends the related request to the Passport local strategy.
* The Passport local strategy calls the `verify()` callback method declared by the Local Authentication Plugin to check credentials.
* The plugin calls the User Repository and check if credentials are good and resolve to an existing user.
* If a user is found, he is resolved and sent back to the Auth Controller through the internal components.
* The Auth Controller calls the `generateToken()` method to get a [JWT Token](https://jwt.io/) corresponding to the user.
* The JWT Token is sent back to the client, who will use it in next requests to be authenticated:

Sample response:

```javascript
{
  "status": 200,
  "error": null,
  "controller": "auth",
  "action": "login",
  "state": "done",
  "requestId": "ed4faaff-253a-464f-a6b3-387af9d8483d",
  "volatile": {},
  "result": {
    "_id": "my_username",
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJteV91c2VybmFtZSIsIm5hbWUiOiJKb2huIERvZSIsImFkbWluIjp0cnVlfQ.BefoyfAKzwXuGhbYe0iPeG0v9F4HmikvahqwqzQr3pE"
  }
}
```

---

### Example - OAuth2 Strategy

The "Oauth" strategy, implemented by the [Passport Oauth Plugin](https://GitHub.com/kuzzleio/kuzzle-plugin-auth-passport-oauth), authenticates a user  via Github, Google+, Facebook, Twitter, or any identity provider using OAUth2 protocol with "Authorization Code" grant type.

For more details about OAuth2 protocol, see [here](https://www.digitalocean.com/community/tutorials/an-introduction-to-oauth-2#grant-type-authorization-code).

![auth_scenario_details_oauth2]({{ site_base_path }}assets/images/request-scenarios/auth/details-oauth2.png)

The authentication flow is a 2-step flow:

#### 1st step: get the OAuth2 Provider's URL

* The user calls the `login` action of the Auth Controller:

```javascript
{
  "controller": "auth",
  "action": "login",
  "body": {
    "strategy": "GitHub"
  }
}
```

* The Auth Controller calls the `authenticate()` method of the Passport Wrapper which formats and sends the related request to the Passport OAuth2 strategy.
* The strategy calls a redirection to the OAuth2 Provider.
* The Passport Wrapper intercepts the redirection request and formats a Kuzzle Response for the client:

```javascript
{
  "headers":
  {
    "Content-Length": "0",
    "Location": "https://GitHub.com/login/oauth/authorize?response_type=code&redirect_uri=http%3A%2F%2Fkuzzle%2Fapi%2F1.0%2F_login%2Fgithub&client_id=MY_CLIENT_ID"
  },
  "statusCode": 302
}
```

* The Auth Controller sends the response to the client, with the redirection URL to the OAUth2 Provider:

```javascript
{
  "action": "login",
  "controller": "auth",
  "error": null,
  "volatile": {},
  "requestId": "fd4246f9-717c-4503-b50b-3a5bf0f142b5",
  "result": {
    "headers": {
      "Content-Length": "0",
      "Location": "https://GitHub.com/login/oauth/authorize?response_type=code&redirect_uri=http%3A%2F%2Fkuzzle%2Fapi%2F1.0%2F_login%2Fgithub&client_id=MY_CLIENT_ID"
    },
    "statusCode": 302
  },
  "scope": null,
  "state": "done",
  "status": 200
}
```

#### 2nd step: authenticate the user with the OAuth2 code.

* The Client sends an HTTP request to the OAuth2 Provider (unless you are using a Kuzzle SDK, this has to be implemented within the client's application code).
* The user authenticates to the OAuth2 Provider and allow Kuzzle Application to use his credentials (that is the standard OAuth2 flow, managed at the provider's side).
* The OAuth2 Provider sends a HTTP redirect response to the client, containing the OAuth2 authorization code:

```
HTTP/1.1 302 Found
Location: http://<kuzzle>/_login/GitHub?code=OAUTH2_CODE
```

* The client calls again the `login` action of the Auth Controller, now with the OAuth2 authorization code:
  * either in HTTP, simply following the redirection `curl http://<kuzzle>/_login/GitHub?code=OAUTH2_CODE`
  * or, with another protocol (for example WebSocket), after having parsed the URL to get the authorization code:

```javascript
{
  "controller": "auth",
  "action": "login",
  "body": {
    "strategy": "GitHub",
    "code": "OAUTH2_CODE"
  }
}
```

* The Auth Controller calls the `authenticate()` method of the Passport Wrapper which formats and sends the related request to the Passport OAuth2 strategy.
* The Passport OAuth2 strategy forwards the OAuth2 authorization code to the OAuth2 Provider in order to retrieve the OAuth2 Token.
* The Passport OAuth2 strategy calls the `verify()` callback method declared by the OAuth2 Authentication Plugin
* The plugin calls the User Repository to check for an existing user with the given GitHub ID. _(Note: If no related user is found in Kuzzle, the plugin can either deny the authentication or create automatically the user, depending on the settings)._
* The user is resolved and sent back to the Auth Controller through the internal components.
* The Auth Controller calls the `generateToken()` method to get a [JWT Token](https://jwt.io/) related to the user.
* The JWT Token is sent back to the client, who will use it in next requests to be authenticated.

---

## How to provide your own strategy

Any strategy supported by PassportJS can be implemented in Kuzzle with a dedicated plugin. Please refer to the [Plugins Reference]({{ site_base_path }}plugins-reference/plugins-features/adding-authentication-strategy)).

---
