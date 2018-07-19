---
layout: full.html.hbs
algolia: true
title: Error Handling
description: understanding the Kuzzle error handling mechanisms
order: 500
---

# Error Handling

All errors received by Kuzzle clients are `Kuzzle Errors`.

A `Kuzzle Error` has the following properties:

| property | type | description |
| -------- | ---- | ----------- |
| `status` | integer | An HTTP style status code. In most cases, will be the same as the response status. |
| `message` | text | A short description of the error |
| `stack` | text | **Available in development mode only** - The stack trace that generated the error |

Clients can detect the error type based on the `status` and process the error accordingly.

---

## BadRequestError

{{{since "1.0.0"}}}

**status**: 400

A `BadRequestError` is thrown if Kuzzle was unable to process the action due to a malformed request.

A `BadRequestError` can occur if a mandatory parameter is missing or if its type is incorrect.

---

## ExternalServiceError

{{{since "1.0.0"}}}

**status**: 500

An `ExternalServiceError` is thrown if Kuzzle was unable to process the action due to some external service failure (e.g. database failure).

---

## ForbiddenError

{{{since "1.0.0"}}}

**status**: 403

A `ForbiddenError` is thrown if the current authenticated user is not authorized to make the requested action.

---

## GatewayTimeoutError

{{{since "1.0.0"}}}

**status**: 504

A `GatewayTimeoutError` is thrown if Kuzzle takes too long to respond.

<aside class="warning">
Receiving this error does not guarantee the original request was not processed, just that it was not processed _in time_.<br>
The Client Application will have to determine if the process was completed.
</aside>

---

## InternalError

{{{since "1.0.0"}}}

**status**: 500

An `InternalError` is thrown if Kuzzle encountered a severe unknown error.

---

## NotFoundError

{{{since "1.0.0"}}}

**status** 404

A `NotFoundError` is thrown if the requested resource could not be found (e.g. a document is requested with a non-existing id).

---

## PartialError

{{{since "1.0.0"}}}

**status**: 206

A `PartialError` is thrown if Kuzzle was unable to process a subset of a multi-action request.

A `PartialError` can be generated, for instance, if one or several queries inside a `bulk/import` request failed.

The detail of each failure can be retrieved in the `errors` property of the error object.

### Additional Properties

| property | type | description |
| -------- | ---- | ----------- |
| `count` | integer | The number of failures encountered |
| `errors` |  array of objects | The list of failed actions |

---

## PluginImplementationError

{{{since "1.0.0"}}}

**status**: 500

A `PluginImplementationError` is thrown if Kuzzle encountered a severe unknown error issued by a [plugin]({{ site_base_path }}plugins-reference).

---

## PreconditionError

{{{since "1.0.0"}}}

**status**: 412

A `PreconditionError` is thrown if Kuzzle was not able to process the request due to an invalid state.

This error can be generated when trying to create a document on a non-existing collection.

---

## ServiceUnavailableError

{{{since "1.0.0"}}}

**status**: 503

A `ServiceUnavailableError` can be sent by Kuzzle if no instance is found to process the request.

---

## SizeLimitError

{{{since "1.0.0"}}}

**status**: 413

A `SizeLimitError` is thrown by Kuzzle if the request size exceeds the limits defined by the [kuzzle configuration]({{ site_base_path }}guide/essentials/configuration).

---

## UnauthorizedError

{{{since "1.0.0"}}}

**status**: 401

An `UnauthorizedError` is thrown by Kuzzle if the permissions could not be verified for the request.

Typically, an `UnauthorizedError` will be generated for a restricted action if the client or user has not authenticated.
