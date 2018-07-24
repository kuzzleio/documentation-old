---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: login
---

# login

{{{since "1.0.0"}}}

<blockquote class="js">
<p>
**URL:** `http://kuzzle:7512/_login/<strategy>[?expiresIn=<expiresIn>]`  
**Method:** `POST`  
**Body:**
</p>
</blockquote>

```js
{
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
  "strategy": "<strategy>",
  "expiresIn": "<expiresIn>",

  "body": {
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
    "_id": "<kuid>", // The kuzzle user identifier
    "jwt": "<JWT encrypted token>"
  }
}
```

Authenticates a user.


## Arguments

#### `strategy` (required)

**Type:** string

The name of the authentication [strategy]({{ site_base_path }}guide/kuzzle-depth/authentication/#authentication) used to log the user in.

#### `expiresIn` (optional)

**Type:** string or integer  
**Default:** depends on [Kuzzle configuration file]({{ site_base_path }}guide/essentials/configuration/)

* if a raw number is provided (not enclosed between quotes), then the expiration delay is in milliseconds
* if this value is a string, then its content is parsed by the [ms](https://www.npmjs.com/package/ms) library

Examples: `"6d"`, `"10h"`, `86400000`

#### Other arguments

Depending on the chosen authentication `strategy`, additional [credential arguments]({{ site_base_path }}guide/kuzzle-depth/authentication/#authentication) may be required.  
The API request example in this page provides the necessary arguments for the [`local` authentication plugin](https://github.com/kuzzleio/kuzzle-plugin-auth-passport-local).

Check the appropriate [authentication plugin]({{ site_base_path }}plugins-reference/plugins-features/adding-authentication-strategy/) documentation to get the list of additional arguments to provide.

## Result

The **_login** action returns an encrypted JSON Web Token, that must then be sent in the [requests headers]({{ site_base_path }}api-documentation/query-syntax/authorization-token/).
