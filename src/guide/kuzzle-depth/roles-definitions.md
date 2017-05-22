---
layout: full.html
algolia: true
title: Advanced Roles Definitions
order: 200
---

# Advanced Roles Definitions

In the [User Guide]({{ site_base_path }}guide/essentials/security/#permissions), we have seen how to assign basic roles to profiles and profiles to users. Here, we are going to learn how to set complex and dynamic permissions.

The privileges for a certain action (restricted to a given set of indexes and collections) must be expressed as a boolean value. So far, we hard-coded this value within the permissions configuration. In some cases, this will not fit your needs. In a collaborative TO-DO list application, for example, a user should not be allowed to update other user's items. This need is addressed by what we call Permission Closures.

---

## Permission Closures

Instead of hard-coding the permission boolean value, we assign a function (a closure) that computes this value and returns it based on the execution context.

For example, if we need to allow users to update only their own documents, it can be done with this sample role:

```javascript
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

- `test` is the body of [the permission function]({{ site_base_path }}guide/kuzzle-depth/roles-definitions/#the-permission-function)
- `args` is the parameter given to [the fetch definition function]({{ site_base_path }}guide/kuzzle-depth/roles-definitions/#the-fetch-definition)

---

## The permission function

The permission function is executed in a sandbox with a limited context. Its body is the evaluation of the `test` parameter given in the role's definition and **must return a boolean value**.

The permission function has the following signature:

```javascript
/**
 * @param {Request} $request              The current action request.
 * @param {string} $currentUserId         The current user kuid. Shortcut to request.context.token.userId
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

### $request

The [Request](https://github.com/kuzzleio/kuzzle-common-objects#request) object is the request that is currently being evaluated.  

### $currentUserId

The `$currentUserId` variable contains the current user [`<kuid>`]({{ site_base_path }}guide/kuzzle-depth/authentication/#the-kuzzle-user-identifier-kuid). It is an alias for `request.context.token.userId`.

### args

The main purpose of the "closures" behavior is to define a role policy based on the current state of the persistence layer. This means that we need to fetch documents from the storage engine in order to use them within the permission function.

The `args` object contains these documents, as a result of the evaluation of the [fetch definition]({{ site_base_path }}guide/kuzzle-depth/roles-definitions/#the-fetch-definition).
Each `args` item will look like:

```javascript
{
  "content": {}, // the document itself
  "id": "<document id>"
}
```

In the sample role above (`return args.document.content.user.id === $currentUserId`), the `update` action is allowed only if the fetched document contains an attribute `user.id` which value is the current user ID.

---

## The Fetch Definition

The Fetch Definition allows you to pass some documents fetched from the persistence layer to your permission function.

In our sample role above, we fetch a `document` variable which contains the document that was requested for update, and we use it in the permission function to test if it is owned by the current user.

### args element structure

The `args` element is the place where we define our Fetch Definitions and has the following structure:

```javascript
{
  "args": {
    "<some variable>": {
      "index": "<index from which to fetch the document(s)>",
      "collection": "<collection from which to fetch the document(s)>",
      "action": {
        "<action type (get|mget|search)>": {} // <action type specific parameters>
      }
    },
    "<another variable>": {
      // ...
    },
    // ...
  }
}
```

You can define one or more variables inside the args element and, for each of them, the action to use to populate them. Each variable will then be available in [your permission function]({{ site_base_path }}guide/kuzzle-depth/roles-definitions/#the-permission-function) as `args.<variable>`.

### Embedded variables

Some variables are exposed by Kuzzle and can be used within your Fetch  Definition:

- `$request`: The complete request object being evaluated.
- `$currentId`: The current request document ID. It is an alias for `$request.input.resource._id`.

### action types

#### `get`

The `get` action type performs a read/get call. It fetches a document by its ID.

Example:

```javascript
{
  "args": {
    "currentDocument": {
      "index": "$request.input.resource.index",
      "collection": "$request.input.resource.collection",
      "action": {
        "get": "$currentId"
      }
    },
    "anotherDocument": {
      "index": "myIndex",
      "collection": "myCollection",
      "action": {
        "get": "document_id"
      }
    }
  }
}
```

In the `args` field, we declare the following Fetch Definitions:

* `currentDocument`, which represents the document that the user wants to update and whose Fetch Definition is composed of:
  - `index`: the index pointed by the current Request;
  - `collection`: the collection pointed by the current Request;
  - `$currentId`: the document ID pointed by the current Request, passed as an argument to the `get` action.
* `anotherDocument`, which represents another document, just as an example, fetched the same way as the previous one but with different parameters.

#### `mget`

The `mget` action type takes a list of document ids for entry and returns the list of matching documents.

```javascript
{
  "args": {
    "myDocuments": {
      "index": "myIndex",
      "collection": "myCollection",
      "action": {
        "mget": [
          "id_1",
          "id_2",
          // ...
        ]
      }
    }
  }
}
```

In the `args` field, we declare a multi-valued Fetch Definition. Notice how the `mget` action takes an array of IDs rather than a single value.

These documents are accessed in the Permission Function as follows:

```javascript
args.myDocuments = [
  {
    id: "id_1", content: {name: "Document 1", description: "Cum sociis natoque penatibus et magnis dis parturient montes"},
  }
  {
    id: "id_2", content: {name: "Document 2", description: "nascetur ridiculus mus. Nulla nunc velit"},
  }
  ...
]
```

#### `search`

The `search` action type performs a search on the persistence layer and returns the resulting documents. It behave exactly like a normal [document search]({{ site_base_path }}guide/essentials/persisted/#document-search).

Example:

```javascript
{
  "args": {
    "myDocuments": {
      "index": "myIndex",
      "collection": "myCollection",
      "action": {
        "search": {
          "filter": {
            "match": {
              "name": "$request.input.body.name"
            }
          }
        }
      }
    }
  }  
}
```

The search results are available in the Permission Function as an array of documents fetched from `myIndex`/`myCollection`, for which the `name` attribute matches the `name` attribute of the request:

```javascript
args.myDocuments = [
  { id: "id_1", content: {name: "foo", description: "Cum sociis natoque penatibus et magnis dis parturient montes"}},
  { id: "id_2", content: {name: "foo bar", description: "nascetur ridiculus mus. Nulla nunc velit"}},
  ...
]
```

The content of `action.search` is directly passed to Elasticsearch.

Please refer to [our Elasticsearch Cookbook]({{ site_base_path }}elasticsearch-cookbook/) for additional information on how to build your query.
