---
layout: side-code.html.hbs
algolia: true
language-tab:
  js: HTTP
  json: Other protocols
title: deleteProfile
---


# deleteProfile

{{{since "1.0.0"}}}



<blockquote class="js">
<p>
<b>URL:</b> <code>http://kuzzle:7512/_profiles/&lt;profileId&gt;[?refresh=wait_for]</code>  
<br><b>Method:</b> <code>DELETE</code>
</p>
</blockquote>

<blockquote class="json">
<p>
<b>Query</b>
</p>
</blockquote>

```json
{
  "controller": "security",
  "action": "deleteProfile",
  "refresh": "wait_for",

  "_id": "<profileId>"
}
```

>**Response**

```javascript
{
  "status": 200,                     
  "error": null,                     
  "result": {
    "_id": "<profileId>"              // The profile id
  },
  "index": "%kuzzle",
  "collection": "profiles",
  "action": "deleteProfile",
  "controller": "security",
  "requestId": "<unique request identifier>"
}
```

Given a `profile id`, deletes the corresponding profile from the database. Note
that the related roles will NOT be deleted.

The optional parameter `refresh` can be used
with the value `wait_for` in order to wait for the profile's deletion to be indexed (indexed profiles are available for `search`).

<aside class="notice">
The security `profile id` is the same one you set when you create a security profile.
</aside>
