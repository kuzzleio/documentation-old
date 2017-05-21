---
layout: side-code.html
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: login
---

# login


<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/_login`  
**Method:** `POST`  
**Body:**
</p>
</blockquote>

```js
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

<blockquote class="json">
<p>
**Query**
</p>
</blockquote>

```json
{
  "controller": "auth",
  "action": "login",

  "body": {
    "strategy": "<passportjs_strategy>",
    "expiresIn": "<expiresIn>",
    "username": "<username>",
    "password": "<password>"
  }
}
```

>**Response**

```javascript
{
  "status": 200,
  "error": null,
  "controller": "auth",
  "action": "login",
  "requestId": "<unique request identifier>",
  "volatile": {},
  "result": {
    "_id": "<kuid>",// The kuzzle user identifier
    "jwt": "<JWT encrypted token>"
  }
}
```

Authenticates a user with a defined **passportjs** authentication strategy.
See [passportjs.org](http://www.passportjs.org/) for more details about authentication strategies.

Strategies are implemented as [plugins]({{ site_base_path }}plugins-reference/plugins-features/adding-authentication-strategy).
The default "local" strategy is enabled by default
(see [kuzzle-plugin-auth-passport-local](https://github.com/kuzzleio/kuzzle-plugin-auth-passport-local)),
and let you authenticate with a login and password.

The **_login** action returns an encrypted JSON Web Token, that must then be sent within the [requests headers]({{ site_base_path }}api-documentation/query-syntax/authorization-token/).
