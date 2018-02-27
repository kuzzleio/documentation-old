---
layout: category-childrens.html
title: Data Validation
order: 400
description: The reference for the data-validation engine in Kuzzle Backend.
icon: fa-check
---

# Data Validation

Kuzzle Backend natively provides a way to validate documents that you create, replace, update or publish.
You can specify the validation specification in the Kuzzle Backend configuration file under `validation`.

Validation specifications are always attached to the collection of an index.

The API offers several actions to perform on validation specifications, allowing you to read, update, delete or validate them. Please refer to the [API documentation]({{ site_base_path }}api-documentation/controller-collection/update-specifications/) for more information.

A validation specification is composed of three properties:

* [`fields`]({{ site_base_path }}validation-reference/fields/fields/): this property is intended to describe the document's fields. It includes the definition of their type, boundaries, if they're required or not etc. depending on the type of the field.
* [`validators`]({{ site_base_path }}validation-reference/validators/): this property is intended to match the document using [Koncorde filters]({{ site_base_path }}kuzzle-dsl/). It can be used to build conditionnal filters, acceptance criterias, etc.
* [`strict`]({{ site_base_path }}validation-reference/fields/strict/): this property determines if the field specification is strict. If it is, the addition of unknown fields (i.e. not defined in the `fields` property) is forbidden and will be rejected.
