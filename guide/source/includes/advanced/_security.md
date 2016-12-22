## Security

### Authentication Process

#### Overview

Kuzzle uses [passportjs](http://passportjs.org/) to enable authentication with a potentially large amount of providers, for example:

- local username/password authentication (enabled by default)
- oauth2 providers like github or google (using (Oauth plugin)[https://github.com/kuzzleio/kuzzle-plugin-auth-passport-oauth])
- SAML providers
- etc.

#### How it works

Remember the [Architecture overview](#core-architecture) and focus on the components involved by reading actions:
![read_scenario_http_overview](./images/request-scenarios/auth/overview.png)

Kuzzle uses these internal components during the authentication process:
* The Auth Controller
* The "Passport Wrapper", which makes an interface between Kuzzle controllers and the Passport library
* The User and Token [Repositories](https://github.com/kuzzleio/kuzzle/tree/master/lib/api/core/models/repositories), to retrieve users' data.
* The Authentication strategy, implemented within a dedicated plugin.

##### Sample scenario with the Local Plugin

The "Local" strategy authenticates a user locally with his username/password, implemented by the [Passport Local Plugin](https://github.com/kuzzleio/kuzzle-plugin-auth-passport-local).

Detailed workflow:

![auth_scenario_details_local](./images/request-scenarios/auth/details-local.png)

\#1. The user calls the *login* action of the ```Auth Controller```:

```json
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

\#2. The ```Auth Controller``` calls the *authenticate()* method of the ```Passport Wrapper``` which format and sends the related request to the ```Passport local strategy```.

\#3. The ```Passport local strategy``` calls the *verify()* callback method declared by the ```Local Authentication Plugin``` to check credentials.

\#4. The plugin calls the ```User Repository``` and check if credentials are good and resolve to an existing user.

\#5. If a user is found, he is resolved and sent back to the ```Auth Controller``` through the internal components.

\#6. The ```Auth Controller``` calls the *generateToken()* method to get a [JWT Token](https://jwt.io/) related to the user.

\#7. The JWT Token is sent back to the client, who will use it in next requests to be authenticated:

Sample response:

```json
{
  "status": 200,
  "error": null,
  "controller": "auth",
  "action": "login",
  "state": "done",
  "requestId": "ed4faaff-253a-464f-a6b3-387af9d8483d",
  "metadata": {},
  "result": {
    "_id": "my_username",
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJteV91c2VybmFtZSIsIm5hbWUiOiJKb2huIERvZSIsImFkbWluIjp0cnVlfQ.BefoyfAKzwXuGhbYe0iPeG0v9F4HmikvahqwqzQr3pE"
  }
}
```

##### OAuth2 scenario with the Oauth Plugin

The "Oauth" strategy, implemented by the [Passport Oauth Plugin](https://github.com/kuzzleio/kuzzle-plugin-auth-passport-oauth), authenticates a user locally with his account on Github, Google+, Facebook, Twitter, or any identity provider using OAUth2 protocol with "Authorization Code" grant type.

For more details about OAuth2 protocol, see [here](https://www.digitalocean.com/community/tutorials/an-introduction-to-oauth-2#grant-type-authorization-code).

Detailed workflow:

![auth_scenario_details_oauth2](./images/request-scenarios/auth/details-oauth2.png)

The authentication flow is a 2-step flow:

###### 1st step: get the OAuth2 Provider's URL

\#1. The user calls the *login* action of the ```Auth Controller```:

```json
{
  "controller": "auth",
  "action": "login",
  "body": {
    "strategy": "github"
  }
}
```

\#2. The ```Auth Controller``` calls the *authenticate()* method of the ```Passport Wrapper``` which format and sends the related request to the ```Passport oauth2 strategy```.

\#3. While no Authorization code is provided, the strategy calls a redirection to the ```OAuth2 Provider```

\#4. The ```Passport Wrapper``` intercepts the redirection request and format a Kuzzle Response for the client:

```json
{
  "headers":
  {
    "Content-Length": "0",
    "Location": "https://github.com/login/oauth/authorize?response_type=code&redirect_uri=http%3A%2F%2Fkuzzle%2Fapi%2F1.0%2F_login%2Fgithub&client_id=MY_CLIENT_ID"
  },
  "statusCode": 302
}
```

\#5. The ```Auth Controller``` sends the response to the client, with the redirection URL to the ```OAUth2 Provider```:

```json
{
  "action": "login",
  "controller": "auth",
  "error": null,
  "metadata": {},
  "requestId": "fd4246f9-717c-4503-b50b-3a5bf0f142b5",
  "result": {
    "headers": {
      "Content-Length": "0",
      "Location": "https://github.com/login/oauth/authorize?response_type=code&redirect_uri=http%3A%2F%2Fkuzzle%2Fapi%2F1.0%2F_login%2Fgithub&client_id=MY_CLIENT_ID"
    },
    "statusCode": 302
  },
  "scope": null,
  "state": "done",
  "status": 200
}
```

###### 2nd step: authenticate the user with the OAuth2 code.

\#6. The Client sends an HTTP request to the ```OAuth2 Provider``` (**it has to be implemented within the client's application code**).

\#7. The user authenticates himself to the ```Oauth2 Provider``` and allow Kuzzle Application to use his credentials (that is the standard OAuth2 flow, managed at the provider's side).

\#8. The ```OAuth2 Provider``` sends a HTTP redirect response to the client, containing the oauth2 authorization code:

```
HTTP/1.1 302 Found
Location: http://<kuzzle>/_login/github?code=OAUTH2_CODE
```

\#9. The client calls again the *login* action of the ```Auth Controller```, now with the oauth2 authorization code:

* either in HTTP, simply following the redirection:

```
curl http://<kuzzle>/_login/github?code=OAUTH2_CODE
```

* or, with another protocol (for example WebSocket), after having parsed the URL to get the authorization code:

```json
{
  "controller": "auth",
  "action": "login",
  "body": {
    "strategy": "github",
    "code": "OAUTH2_CODE"
  }
}
```

\#10. The ```Auth Controller``` calls the *authenticate()* method of the ```Passport Wrapper``` which format and sends the related request to the ```Passport oauth2 strategy```.

\#11. The ```Passport oauth2 strategy``` transmits the oauth2 authorization code to the ```OAuth2 Provider``` in order to retrieve the OAuth2 Token.

\#12. The ```Passport oauth2 strategy``` calls the *verify()* callback method declared by the ```Oauth2 Authentication Plugin```

\#13. The plugin calls the ```User Repository``` to check for an existing user with the given github ID.

_(Note: If no related user is found in kuzzle, the plugin can either deny the authentication, or create automatically the user, depending on its settings)._

\#14. The user is resolved and sent back to the ```Auth Controller``` through the internal components.

\#15. The ```Auth Controller``` calls the *generateToken()* method to get a [JWT Token](https://jwt.io/) related to the user.

\#16. The JWT Token is sent back to the client, who will use it in next requests to be authenticated:


#### How to provide your own strategy

Any strategy supported by passportjs can be implemented for Kuzzle with a dedicated plugin (see [plugins documentation](#gt-authentication-plugin)).

### Roles definition reference

#### Role and profile definition

see [User Guide](#permissions).

#### Permission closures

The `action permission` value can be set either to:

- a boolean. When set to `true`, the user is allowed to perform the action.
- an object that describes a function (we call it "closure").

A closure enable to set a role's policy according to some execution context.
For example, if we need to allow users to update only their own documents, it can be done with this sample role:

```js
let role = {
  controllers: {
    write: {
      actions: {
        update: {
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

Where:
- `test` is the body of [the permission function](#the-permission-function)
- `args` is the parameter given to [the fetch definition function](#the-fetch-definition)

(see below)

##### The permission function

The permission function is executed in a sandbox with a limited scope. Its body is the evaluation of the _test_ parameter given in the role's definition and must return a boolean value.

The permission function has the following signature:

```js
/**
 * @param {Request} $request              The current action request.
 * @param {string} $currentUserId         The current user Id. Shortcut to request.context.token.userId
 * @param {Object} args                   The result of the evaluated args definition.
 *
 * @return {Boolean}
 */
function ($request, $currentUserId, args) {
  // the function body is built from the "test" parameter.
  // Example, with the sample role above:
  return args.document.content.user.id === $currentUserId;
};
```

###### Parameters

###### > $request

The [Request](https://www.npmjs.com/package/kuzzle-common-objects#request) object is the request that is currently being evaluated.  
A typical request object will look like this:

```js
{
  id: '66978665-1ac5-4770-890c-59cc88f89098',
  timestamp: 14582100322345,
  input: {
    controller: 'write',
    action: 'update',
    resource: {
      index: 'myIndex',
      collection: 'myCollection',
      _id: 'id_1'
    },
    body: {
      foo: 'bar'
    },
    metadata: {
      someMetadata: "some metadata value"
    },
    jwt: null,
    args: {}
  },
  error: null,
  result: null,
  status: 102,
  context: {
    connectionId: '123456789',
    protocol: 'network protocol'
  }
}
```

###### > $currentUserId

The _$currentUserId_ variable contains the current user ID. It is an alias for `request.context.token.userId`.

###### > args

The main purpose of the "closures" behavior is to define a role policy based on conditions about stored documents.
That means that we need to fetch documents from the storage engine in order to use them within the permission function.

The _args_ object contains these documents, as a result of the evaluation of the [fetch definition](#the-fetch-definition).
Each _args_ item will look like:

```js
{
  content: <the document itself>,
  id: <the document id>
}
```

With the sample role above (`return args.document.content.user.id === $currentUserId`), the `update` action is allowed only if the fetched document contains an attribute `user.id` which value is the current user ID.


#### The fetch definition

The optional _args_ parameter given to the permission function is the result of the evaluation of some fetch definition given in the args section of the role definition.

Using this ability, you can pass some documents fetched from Kuzzle's database layer to your permission function.

In our sample role above, we fetch a _document_ variable which contains the document that was requested for update, and we use it in the permission function to test if it is owned by the current user.

##### args element structure

The _args_ element has the following structure:

```js
var args = {
  <some variable>: {
    index: <index from which to fetch the document(s)>,
    collection: <collection from which to fetch the document(s)>,
    action: {
      <action type (get|mget|search)>: <action type specific parameters>
    }
  },
  <another variable>: {
    ...
  },
  ...
};
```

You can define one or more _variables_ inside the args element and, for each of them, the action to use to populate them.

Each _variable_ will then be availalbe in [your permission function](#the-permission-function) under `args.<variable>`.

###### embedded variables

Some variables are exposed by Kuzzle and can be used within your fetch function definition:

- `$request`: The complete request object being evaluated.
- `$currentId`: The current request's document ID. It is an alias for `$request.input.resource._id`.

###### action types

###### > _get_ action type

The `get` action type performs a read/get call. It takes a document id for entry and returns the matching document.

Example:

```js
var args = {
  currentDocument: {
    index: "$request.input.resource.index",
    collection: "$request.input.resource.collection",
    action: {
      get: "$currentId"
    }
  },
  anotherDocument: {
    index: "myIndex",
    collection: "myCollection",
    action: {
      get: "document_id"
    }
  }
};
```

The _args_ variable passed to the permission function contains:
- `args.currentDocument`: the document that is being updated. Indeed, we fetch:
  - the document which ID is the current document's ID (`{action: {get: "currentId"}}`)
  - in the current collection (`collection: "$request.input.resource.collection"`)
  - of the current index (`index: "$request.input.resource.index"`).
- `args.anotherDocument`: the document with ID `document_id`, from index `myIndex` and collection `myCollection`.

###### > _mget_ action type

The `mget` action type takes a list of document ids for entry and returns the list of matching documents.

```js
var args = {
  myDocuments: {
    index: "myIndex",
    collection: "myCollection",
    action: {
      mget: [
        "id_1",
        "id_2",
        ...
      ]
    }
  }
};
```

The _args_ variable passed to the permission function contains an array of documents fetched from `myIndex`/`myCollection`, like:

```js
args.myDocuments = [
  { id: "id_1", content: {name: "Document 1", description: "Cum sociis natoque penatibus et magnis dis parturient montes"},
  { id: "id_2", content: {name: "Document 2", description: "nascetur ridiculus mus. Nulla nunc velit"},
  ...
]
```


###### > _search_ action type

The `search` action type makes a search in Kuzzle's database layer and returns the related documents.

Example:

```js
var args = {
  myDocuments: {
    index: "myIndex",
    collection: "myCollection",
    action: {
      search: {
        filter: {
          match: {
            name: "$request.input.body.name"
          }
        }
      }
    }
  }
};
```

The _args_ variable passed to the permission function contains an array of documents fetched from `myIndex`/`myCollection`, for which the `name` attribute matches the `name` attribute of the request:

```js
args.myDocuments = [
  { id: "id_1", content: {name: "foo", description: "Cum sociis natoque penatibus et magnis dis parturient montes"},
  { id: "id_2", content: {name: "foo bar", description: "nascetur ridiculus mus. Nulla nunc velit"},
  ...
]
```


The _action.search_ value is sent to Kuzzle's database layer directly, being Elasticsearch 2.2.

Please refer to [Elasticsearch search API documentation](https://www.elastic.co/guide/en/elasticsearch/reference/2.2/search-request-body.html) for additional information on how to build your query.
