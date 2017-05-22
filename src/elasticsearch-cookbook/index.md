---
layout: category-childrens.html
title: Elasticsearch Cookbook
order: 700
description: Learn how to query persistent data in Kuzzle
icon: fa-book
---

# Elasticsearch Cookbook

## Before we start

Elasticsearch is a full text search engine. It has 2 main purposes.

The first is to be able to search its content according to a query and retrieve the corresponding documents.

The second is to sort these documents according to their relevancy toward the query.  
To do so, Elasticsearch computes a score according to the request.  
This score is influenced by each part of the query but the most sophisticated feature resides
in its ability to tokenize words in a text field and ponderate it according to the frequency of
these words in the corpus.  

You can find more information about scoring in the [Elasticsearch documentation](https://www.elastic.co/guide/en/elasticsearch/guide/2.x/scoring-theory.html).
