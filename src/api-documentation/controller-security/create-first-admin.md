---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: createFirstAdmin
---


# createFirstAdmin

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/&lt;kuid&gt;/_createFirstAdmin[?reset=1]</code> or <code>http://kuzzle:7512/_createFirstAdmin[?reset=1]</code>  
<br><b>Method:</b> <code>POST</code>  
<br><b>Body</b>
</p>
</blockquote>

```js
{
  "content": {
    "name": "John Doe", // Additional optional User properties
    ...
  },
  "credentials": {
    "strategy-name": {
      ...
    }
  }
}

// example with a "local" authentication
{
  "content": {
    "name": "John Doe", // Additional optional User properties
    ...
  },
  "credentials": {
    "local": {
      "username": "userAdmin", // ie: Mandatory for "local" authentication plugin
      "password": "myPassword" // ie: Mandatory for "local" authentication plugin
    }
  }
}
```

<blockquote class="json">
<p>
<b>Query</b>
</p>
</blockquote>

```json
{
  "controller": "security",
  "action": "createFirstAdmin",
  "reset": "true|false",                    
  "_id": "<kuid>",           
  "body": {
    "content": {
      "name": "John Doe",               
    },
    "credentials": {
      "strategy-name": {
      }
    }
  }
}
```

```json
{
  "controller": "security",
  "action": "createFirstAdmin",
  "reset": "true|false",                    
  "_id": "<kuid>",
  "body": {
    "content": {
      "name": "John Doe",    
    },
    "credentials": {
      "local": {
        "username": "userAdmin",   
        "password": "myPassword"   
      }
    }
  }
}
```

>**Response**

```javascript
{
  "status": 200,                     
  "error": null,                     
  "controller": "security",
  "action": "createFirstAdmin",
  "volatile": {},
  "requestId": "<unique request identifier>",
  "result": {
    "_id": "<kuid>",                  // The kuzzle user identifier
    "_source": {
      "name": "John Doe",
      "profileIds": [
        "admin"
      ],
      ...
    }
  }
}
```

Creates the first admin `user` in Kuzzle. Does nothing if an admin user already exists.

If an `_id` is provided in the query and if the user [`<kuid>`]({{ site_base_path }}guide/essentials/user-authentication/#kuzzle-user-identifier-kuid) already exists,
it will be replaced and its `profileIds` will be set to `["admin"]`. If not provided, the `_id` will be generated automatically.

If the optional field `reset` is set to `true` (`1` with http),
the preset roles (`anonymous` and `default`) will be reset with more restrictive rights.

Other mandatory additional information are needed in the `credentials` attribute depending on the authentication plugins you are using.
