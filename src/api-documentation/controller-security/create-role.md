---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: createRole
---


# createRole

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/roles/&lt;roleId&gt;/_create[?refresh=wait_for]</code>  
<br><b>Method:</b> <code>POST</code>  
<br><b>Body</b>
</p>
</blockquote>

```js
{
  "controllers": {
    "*": {
      "actions": {
        "*": true
      }
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
  "action": "createRole",
  "refresh": "wait_for",
  "_id": "<roleId>",

  "body": {
    "controllers": {
      "*": {
        "actions": {
          "*": true
        }
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
  "result": {
    "_id": "<roleId>",
    "_index": "%kuzzle",
    "_type": "roles",
    "_version": 1,
    "created": true,
    "_source": { // your role definition
      "controllers": {
        "*": {
          "actions": {
            "*": true
          }
        }
      }
    }
  }
  "requestId": "<unique request identifier>",
  "controller": "security",
  "action": "createRole",
  "volatile": {},
}
```

Validates and stores a role in Kuzzle.

The optional parameter `refresh` can be used
with the value `wait_for` in order to wait for the role to be indexed (indexed roles are available for `search`).

The body content needs to match Kuzzle's role definition.

To get more detailed information about the expected role definition or Kuzzle's user management model,
please refer to [Kuzzle's permissions documentation]({{ site_base_path }}guide/essentials/security/#user-permissions).
