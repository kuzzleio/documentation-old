---
layout: full.html.hbs
algolia: true
title: errors
order: 300
---

# errors

---

## `KuzzleError`

{{{since "1.0.0"}}}

Inherits from `Error`. Abstract class inherited by Kuzzle error objects.

This class should only be used to create new Kuzzle error objects.

---

## `BadRequestError`

{{{since "1.0.0"}}}

**Status Code:** `400`

Thrown when a request is malformed.

```js
const err = new context.errors.BadRequestError('error message');
```

---

## `ExternalServiceError`

{{{since "1.0.0"}}}

**Status Code:** `500`

Thrown when an external service replies to a request with an error that is not a bad request or a service unavailable error.

```js
const err = new context.errors.ExternalServiceError('error message');
```

---

## `ForbiddenError`

{{{since "1.0.0"}}}

**Status Code:** `403`

Thrown when a user tries to access a resource that they have no permission to access.

```js
const err = new context.errors.ForbiddenError('error message');
```

---

## `GatewayTimeoutError`

{{{since "1.0.0"}}}

**Status Code:** `504`

Thrown when a plugin takes too long to perform a task.

```js
const err = new context.errors.GatewayTimeoutError('error message');
```

---

## `InternalError`

{{{since "1.0.0"}}}

**Status Code:** `500`

Standard generic error. Used for uncatched exceptions.

```js
const err = new context.errors.InternalError('error message');
```

---

## `NotFoundError`

{{{since "1.0.0"}}}

**Status Code:** `404`

Thrown when a requested resource cannot be found.

```js
const err = new context.errors.NotFoundError('error message');
```

---

## `ParseError`

{{{since "1.0.0"}}} {{{deprecated "1.4.1"}}}

**Status Code:** `400`

Use `BadRequestError` instead.

```js
const err = new context.errors.ParseError('error message');
```

---

## `PartialError`

{{{since "1.0.0"}}}

**Status Code:** `206`

Thrown when a request only partially succeeds.

The constructor takes an additional `array` argument containing a list of failures.

```js
const err = new context.errors.PartialError('error message', [{this: 'failed'}, {andThis: 'failed too'}]);
```

---

## `PluginImplementationError`

{{{since "1.0.0"}}}

**Status Code:** `500`

Thrown when a plugin fails.

```js
const err = new context.errors.PluginImplementationError('error message');
```

---

## `PreconditionError`

{{{since "1.0.0"}}}

**Status Code:** `412`

Thrown when a request could not be processed because preconditions were not met.

```js
const err = new context.errors.PreconditionError('error message');
```


---

## `ServiceUnavailableError`

{{{since "1.0.0"}}}

**Status Code:** `503`

Thrown when a resource cannot respond because it is temporarily unavailable.

```js
const err = new context.errors.ServiceUnavailableError('error message');
```

---

## `SizeLimitError`

{{{since "1.0.0"}}}

**Status Code:** `413`

Thrown when a request has exceeded the maximum limits.

```js
const err = new context.errors.SizeLimitError('error message');
```

---

## `UnauthorizedError`

{{{since "1.0.0"}}}

**Status Code:** `401`

Thrown when a user fails to login.

```js
const err = new context.errors.UnauthorizedError('error message');
```
