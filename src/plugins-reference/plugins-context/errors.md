---
layout: full.html
words:  353
algolia: true
title: errors
order: 300
---

# errors

---

## `KuzzleError`

Inherits from `Error`. Abstract class inherited by Kuzzle error objects.

This class should only be used to create new Kuzzle error objects.

---

## `BadRequestError`

**Status Code:** `400`

Used to notify about badly formed requests.

```js
const err = new context.errors.BadRequestError('error message');
```

---

## `ExternalServiceError`

**Status Code:** `500`

Used when an external service answers to a request with an error other than a bad request or a service unavailable one.

```js
const err = new context.errors.ExternalServiceError('error message');
```

---

## `ForbiddenError`

**Status Code:** `403`

Used when a user tries to use resources beyond his access rights.

```js
const err = new context.errors.ForbiddenError('error message');
```

---

## `GatewayTimeoutError`

**Status Code:** `504`

Used when a plugin takes too long to perform a task.

```js
const err = new context.errors.GatewayTimeoutError('error message');
```

---

## `InternalError`

**Status Code:** `500`

Standard generic error. Used for uncatched exceptions.

```js
const err = new context.errors.InternalError('error message');
```

---

## `NotFoundError`

**Status Code:** `404`

Used when asked resources cannot be found.

```js
const err = new context.errors.NotFoundError('error message');
```

---

## `ParseError`

**Status Code:** `400`

Used when a provided resource cannot be interpreted.

```js
const err = new context.errors.ParseError('error message');
```

---

## `PartialError`

**Status Code:** `206`

Used when a request only partially succeeded.

The constructor takes an additional `array` argument containing a list of failed parts.

```js
const err = new context.errors.PartialError('error message', [{this: 'failed'}, {andThis: 'failed too'}]);
```

---

## `PluginImplementationError`

**Status Code:** `500`

Used when a plugin fails.

```js
const err = new context.errors.PluginImplementationError('error message');
```

---

## `PreconditionError`

**Status Code:** `412`

Used when a request could not be processed because preconditions weren't met.

```js
const err = new context.errors.PreconditionError('error message');
```


---

## `ServiceUnavailableError`

**Status Code:** `503`

Used when a resource cannot respond because it is temporarily unavailable.

```js
const err = new context.errors.ServiceUnavailableError('error message');
```

---

## `SizeLimitError`

**Status Code:** `413`

Used to notify about requests exceeding maximum limits.

```js
const err = new context.errors.SizeLimitError('error message');
```

---

## `UnauthorizedError`

**Status Code:** `401`

Used when a user fails a login attempt.

```js
const err = new context.errors.UnauthorizedError('error message');
```
