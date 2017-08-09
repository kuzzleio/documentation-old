---
layout: full.html
algolia: true
title: Command Line Interface
order: 900
---
# Command Line Interface

Kuzzle ships with a [Command line interface](https://en.wikipedia.org/wiki/Command-line_interface) which enables you to:

* start a Kuzzle Core,
* shutdown a Kuzzle Core gracefully
* create the first administrator user,
* reset Kuzzle internal data _(use with caution !)_
* clear Kuzzle's cached data
* produce a diagnostic dump of a Kuzzle Core current state

<aside class="warning">
If you are running Kuzzle in a Docker container, you will have to <a href="https://docs.docker.com/engine/reference/commandline/exec/">enter the Kuzzle container</a> to run these commands.
</aside>

```bash
#!/bin/bash

./bin/kuzzle

#   Usage: kuzzle [options] [command]
#
#
#   Commands:
#
#     createFirstAdmin   create the first administrator user
#     clearCache         clear internal caches in Redis
#     reset [options]    delete Kuzzle configuration and users from database
#     shutdown           gracefully exits after processing remaining requests
#     start [options]    start a Kuzzle instance
#     dump               create a dump of current state of kuzzle
#
#   Options:
#
#     -h, --help      output usage information
#     -V, --version   output the version number
#     -d, --debug     make errors more verbose
#     -C, --noColors  do not use ANSI coloring
```

---

## createFirstAdmin

```bash
#!/bin/bash

./bin/kuzzle createFirstAdmin
```

When Kuzzle runs for the first time, no users are defined and the anonymous user is granted with super-admin rights.

The `createFirstAdmin` command lets you define an administrator user and set your own permissions.

<aside class="notice">NB: This command can only be run interactively</aside>

---

## clearCache

```bash
#!/bin/bash

./bin/kuzzle clearCache
```

Kuzzle relies on the Redis service to store frequently accessed internal data. If you need to restart Kuzzle with a fresh cache, this command can come in hand.

---

## dump

```bash
#!/bin/bash

./bin/kuzzle dump

# [ℹ] Creating dump file...
# [✔] Done!
#
# [ℹ] Dump has been successfully generated in "dump/<date>-<time>-cli" folder
# [ℹ] You can send the folder to the kuzzle core team at support@kuzzle.io
```

The `dump` command creates a snapshot of the state of Kuzzle, including:

* a coredump of Kuzzle Core
* the current Kuzzle Core instance configuration
* server logs
* Node.js binary & properties
* a list of OS properties
* plugins configuration,
* usage statistics of the dumped instance

The generated directory can be used to feed a crash report to the support team if you own a Kuzzle License.

---

## reset

```bash
#!/bin/bash

./bin/kuzzle reset --help

#    Usage: reset [options]
#
#    delete Kuzzle configuration and users from database
#
#    Options:
#
#      -h, --help             output usage information
#      --fixtures <fixtures>  import some fixtures from file
#      --mappings <mappings>  load and apply mappings from file
#      --noint                non interactive mode
```

The `reset` command deletes all currently set configurations and users from the database.

Only Kuzzle internal data are cleaned up: this command has no impact over plugins stored data, or stored documents.

---

## shutdown

```bash
#!/bin/bash

./bin/kuzzle shutdown

# [ℹ] Shutting down...
# [✔] Done!
```

The `shutdown` command allows to stop a Kuzzle Core instance after remaining requests are processed, ensuring that no unnecessary `Service Unavailable` errors are forwarded to clients.

---

## start

```bash
#!/bin/bash

./bin/kuzzle start --help

#    Usage: start [options]
#
#    start a Kuzzle instance
#
#    Options:
#
#      -h, --help                 output usage information
#      -p, --port <port>          Kuzzle port number
#          --fixtures <fixtures>  import some fixtures from file
#          --mappings <mappings>  load and apply mappings from file
```

The `start` command starts a Kuzzle Core instance in the foreground.
