---
layout: category-childrens.html
title: Data Validation
order: 400
description: The reference for the data-validation engine in Kuzzle.
icon: fa-check
---

# Data Validation

Kuzzle natively provides a way to validate the documents you want to create, replace, update or publish against a validation specification.
You can specify the validation rules in the kuzzle configuration file in `validation`.

A specification is always attached to the collection of an index.

The API offers several actions to perform on specifications, allowing to get, update, delete or validate them. You can refer to the [API documentation]({{ site_base_path }}api-documentation/controller-collection/update-specifications/) for more information.

A specification is composed of three properties:

* The [`fields` property]({{ site_base_path }}validation-reference/fields/fields/): this property is intended to describe the document's fields. It includes the definition of their type,  mandatoriness, boundaries, etc. depending on the type of the field.
* The [`validators` property]({{ site_base_path }}validation-reference/validators/): this property is intended to match the document toward [DSL filters]({{ site_base_path }}kuzzle-dsl/). It allows to build conditionnal filters, acceptance criterias, ... In other terms everything possible with the Kuzzle's DSL Filters.
* The [`strict` property]({{ site_base_path }}validation-reference/fields/strict/): this property specifies if the field specification is strict. If it is, the addition of unknown fields (i.e. not defined in the `fields` property) is forbidden and will be rejected.
