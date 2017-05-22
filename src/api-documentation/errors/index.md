---
layout: full.html
algolia: true
title: Errors
description: understand Kuzzle errors mechanisms
order: 500
---

# Errors

All errors received by Kuzzle clients are `Kuzzle errors`.

A `Kuzzle error` has the following properties:

| property | type | description |
| -------- | ---- | ----------- |
| `status` | integer | HTTP like status code. In most cases, will be the same as the response one. |
| `message` | text | Short description of the error |
| `stack` | text | **Available in development mode only** - Kuzzle stack trace that generated the error |

Clients can detect the error type based on their `status` and decide which action to take accordingly.

---

## BadRequestError

**status**: 400

A `BadRequestError` is thrown if Kuzzle was unable to process the action due to a malformed request.

`BadRequestError` objects can for instance be received if a mandatory parameter is missing or if its type is incorrect.

---

## ExternalServiceError

**status**: 500

An `ExternalServiceError` is thrown if Kuzzle was unable to process the action due to some external service failure (i.e. database).

---

## ForbiddenError

**status**: 403

A `ForbiddenError` is thrown if the requested action is not authorized for the current authenticated user.

---

## GatewayTimeoutError

**status**: 504

A `GatewayTimeoutError` is thrown if Kuzzle is too long to respond.

<aside class="warning">
Receiving this error does not guarantee the original request was not processed, just that it was not processed _in time_.<br>
Clients shall make some extra checks to verify if the original action was actually successful.
</aside>

---

## InternalError

**status**: 500

An `InternalError` is thrown if Kuzzle encountered a severe unknown error.

---

## NotFoundError

**status** 404

A `NotFoundError` is thrown if the requested resource could not be found, like, for instance, when calling `document/get` on a non-existing id.

<!---
ParseError: not documented @TODO: remove its current usage by BadRequestError
-->

---

## PartialError

**status**: 206

A `PartialError` is thrown if Kuzzle was unable to process a subset of a multi-actions requests.

A `PartialError` can be generated, for instance, if one or several queries inside a `bulk/import` request failed.

The detail of each failure can be retrieved using the `errors` property of the error object.

---

### Additional properties

| property | type | description |
| -------- | ---- | ----------- |
| `count` | integer | number of failures encountered |
| `errors` | array or `KuzzleError` objects | Detailed errors of the failed actions |

---

## PluginImplementationError

**status**: 500

A `PluginImplementationError` is thrown if Kuzzle encountered a severe unknown error issued by a [plugin]({{ site_base_path }}plugins-reference).

---

## PreconditionError

**status**: 412

A `PreconditionError` is thrown if Kuzzle was not able to process the request due to an invalid state.

This error can for instance be generated when trying to create a document on a non-existing collection.

---

## ServiceUnavailableError

**status**: 503

A `ServiceUnavailableError` can be sent by Kuzzle proxy if no Kuzzle instance is found to process the request.

---

## SizeLimitError

**status**: 413

A `SizeLimitError` is thrown by Kuzzle if the request size exceeds the limits defined in the [proxy configuration]({{ site_base_path }}guide/essentials/proxy-configuration).

---

## UnauthorizedError

**status**: 401

An `UnauthorizedError` is thrown by Kuzzle if the permissions could not be verified for the request.

Typically, an `UnauthorizedError` will be generated for a restricted action if the client is not authentified yet.
