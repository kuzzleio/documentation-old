---
layout: full.html
algolia: true
title: Configuring Kuzzle
order: 200
---

# Configuring Kuzzle

The **complete default configuration** of Kuzzle is stored in the [kuzzlerc file](https://github.com/kuzzleio/kuzzle/blob/master/.kuzzlerc.sample) at the root of the installation directory.

Kuzzle uses [rc](https://github.com/dominictarr/rc) to **override** its default configuration. The most common ways to do it is:

- via a `.kuzzlerc` file ([example here](https://github.com/kuzzleio/kuzzle/blob/master/.kuzzlerc.sample));
- via environment variables prefixed with `kuzzle_`.

### Example 1: configuring Kuzzle via a custom `.kuzzlerc` file

You can write your custom config in `$HOME/.kuzzlerc` or [any other valid location](https://github.com/dominictarr/rc/blob/master/README.md#standards):

```json
{
  "services": {
    "db": {
      "host": "<ES_HOST>",
      "port": "<ES_PORT>"
    }
  }
}
```

### Example 2: configuring Kuzzle via Environment Variables

The name of the environment variables must mimic the structure of the configuration object to override:

* the variable needs to be prefixed with `kuzzle_`,
* the `__` correspond to the levels of nesting in the configuration object (e.g. `kuzzle_services__db__host` corresponds to `services.db.host`).

```bash
#!/bin/bash

kuzzle_services__db__host="<DB_HOST>" node bin/kuzzle start
```

Environment variables are particularly handy to set your custom configuration **through a Docker container**. It is very easy to pass environment variables via the `environment` section of a `docker-compose.yml` file. Take a look at how we pass environment variables to Kuzzle in our default docker-compose file:

```yaml
version: '2'

services:
  kuzzle:
    image: kuzzleio/kuzzle
    cap_add:
      - SYS_PTRACE
    depends_on:
      - redis
      - elasticsearch
    environment:
      - kuzzle_services__db__client__host=http://elasticsearch:9200
      - kuzzle_services__internalCache__node__host=redis
      - kuzzle_services__memoryStorage__node__host=redis
      - NODE_ENV=production

  redis:
    image: redis:3.2

  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:5.4.1
    environment:
      - cluster.name=kuzzle
      # disable xpack
      - xpack.security.enabled=false
      - xpack.monitoring.enabled=false
      - xpack.graph.enabled=false
      - xpack.watcher.enabled=false
```

<aside class="notice">
  For an exhaustive list of configuration parameters, please refer to the <a href="https://github.com/kuzzleio/kuzzle/blob/master/.kuzzlerc.sample">kuzzlerc</a> file.
</aside>
