---
layout: full.html
algolia: true
title: Installation
description: learn how to install elasticsearch from scratch
order: 100
---

# Installation

We want you to manipulate Elasticsearch while you are reading this cookbook,
to do so you will need [cURL](https://curl.haxx.se/download.html), a terminal (Linux, Mac, Cygwin...)
and optionally [docker](https://www.docker.com/products/docker) to speed up the installation.

You can also trust the output we provide in the cookbook and skip the installation chapter.

---

## Launch Elasticsearch

We provide here a way to run Elasticsearch quickly with docker, but you can do it by following the
[installation documentation](https://www.elastic.co/guide/en/elasticsearch/reference/5.x/_installation.html).


To launch Elasticsearch, copy this lines in your terminal:


```bash
#!/bin/bash

sudo sysctl -w vm.max_map_count=262144
docker run -p 9200:9200 elasticsearch:5.0
```

(To stop Elasticsearch, you can use Ctrl-C)

The container we just launched will be accessed at the port 9200 on localhost.
If you installed Elasticsearch using another method, adapt the examples provided in this cookbook to your install.

---

## Check that Elasticsearch is reachable

Run the following command:

```bash
#!/bin/bash

curl -g -X GET "http://localhost:9200/"
```

You can see below an example of reply. This cookbook assumes that your Elasticsearch `version.number` is above **5.0**:

```javascript
{
    "cluster_name": "elasticsearch",
    "cluster_uuid": "AyJUa63UTlqQgHV9I9UzXQ",
    "name": "kp9tiLV",
    "tagline": "You Know, for Search",
    "version": {
        "build_date": "2016-11-24T10:07:18.101Z",
        "build_hash": "f6b4951",
        "build_snapshot": false,
        "lucene_version": "6.2.1",
        "number": "5.0.2"
    }
}
```
