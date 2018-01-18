---
layout: full.html
algolia: true
title: Command Line Interface (CLI)
order: 900
---

# Command Line Interface (CLI)

Kuzzle Backend ships with a [Command line interface](https://en.wikipedia.org/wiki/Command-line_interface) which allows you to:

* Start Kuzzle Backend
* Gracefully shutdown Kuzzle Backend
* Create a first Administrator
* Reset Kuzzle Backend internal data _(use with caution!)_
* Clear Kuzzle Backend cache
* Diagnose the Kuzzle Backend installation

<aside class="warning">
If you are running Kuzzle Backend in a Docker container, you will have to execute these commands from within the <a href="https://docs.docker.com/engine/reference/commandline/exec/">running container</a>.
</aside>

The CLI is located in the `bin` folder of your Kuzzle Backend installation. To get a list of commands and options run the CLI:

```bash
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
./bin/kuzzle createFirstAdmin
```

When Kuzzle Backend runs for the first time, no users are defined and the anonymous user is granted full access rights.

The `createFirstAdmin` command lets you create an administrator to manage security.

<aside class="notice">NB: This command can only be run interactively</aside>

---

## clearCache

```bash
./bin/kuzzle clearCache
```

Kuzzle Backend uses Redis to store frequently accessed internal data. Use this command if you need to clear this data (cache).

---

## dump

```bash
./bin/kuzzle dump

# [ℹ] Creating dump file...
# [✔] Done!
#
# [ℹ] Dump has been successfully generated in "dump/<date>-<time>-cli" folder
# [ℹ] You can send the folder to the kuzzle core team at support@kuzzle.io
```

The `dump` command creates a snapshot of the state of Kuzzle Backend, including:

* a coredump of Kuzzle Backend
* the current Kuzzle Backend configuration
* server logs
* Node.js binary & properties
* a list of OS properties
* plugins configuration
* usage statistics of the dumped instance

The generated directory can be used to feed a crash report to the support team if you own a Kuzzle Backend License.

---

## reset

```bash
./bin/kuzzle reset --help

#    Usage: reset [options]
#
#    delete Kuzzle configuration and users from database
#
#    Options:
#
#      -h, --help             output usage information
#      --noint                non interactive mode
```

The `reset` command deletes all current configurations and users from the database.

Note: this command has no impact on any plugins stored data, or on any Kuzzle Backend stored documents. 

---

## shutdown

```bash
./bin/kuzzle shutdown

# [ℹ] Shutting down...
# [✔] Done!
```

The `shutdown` command lets you stop a Kuzzle Backend instance after any remaining requests are processed, ensuring that no unnecessary `Service Unavailable` errors are returned to connected clients.

---

## start

```bash
./bin/kuzzle start --help

#    Usage: start [options]
#
#    start a Kuzzle instance
#
#    Options:
#
#      -h, --help                 output usage information
#      -p, --port <port>          Kuzzle port number
#          --fixtures <file>      import data from file
#          --mappings <file>      apply mappings from file
```

The `start` command starts a Kuzzle Backend instance.

Using this command you can also initialize the storage layer mapping rules, using the mappings `--mappings` options, and the storage layer documents using the `--fixtures` option.

#### `--mappings`

Loads mapping rules from a file and apply them to the storage layer. 

The input file must be a JSON file with the following structure: 

```json
{
  "index": {
    "collection": {
      "properties": {
        "field1": {},
        "field2": {},
        "field...": {}
      }
    },
  }
}
```

**Notes:**

* The file can contain any number of index and collection configurations.
* Field definitions follow the [Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/5.5/mapping.html) mapping format.
* If an index or collection does not exist, it will be created automatically.
* Mapping rules are loaded sequentially, one index/collection pair at a time. If a failure occurs, Kuzzle Backend immediately interrupts the sequence.
* Mapping rules can be replayed across multiple Kuzzle start sequences, as long as they do not change in-between.


**Example:**

```json
{
  "foo": {
    "bar": {
      "properties": {
        "foobar": {"type": "keyword"},
        "barfoo": {"type": "integer"}
      }
    },
    "baz": {
      "properties": {
        "created": {"type": "date", "format": "strict_date_optional_time||epoch_millis"},
        "other": {"type": "text"}
      }
    }
  }
}
```

### `--fixtures`

Reads documents from a file and loads them into the storage layer.

The file must be a JSON file with the following structure:

```json
{
  "index": {
    "collection": [
      {"<command>": {}},
      {"field": "value", "field2": "value", "field...", "value"}
    ]
  }
}
```

**Notes:**

* The file can contain any number of index and collection configurations.
* Each collection contains an array of data to load, just like the [bulk:import API]({{ site_base_path }}api-documentation/controller-bulk/import/).
* If an index or collection does not exist, the load will fail.
* Fixtures are loaded sequentially, one index/collection pair at a time. If a failure occurs, Kuzzle Backend immediately interrupts the sequence.


**Example:**

```json
{
  "foo": {
    "bar": [
      {"index": {}},
      {"field": "foo", "another_field": 42},
      {"index": {}},
      {"field": "foo", "another_field": 42}
    ],
    "baz": [
      {"index": {}},
      {"bar": "baz", "qux": ["q", "u", "x"]}
    ]
  }
}
```
