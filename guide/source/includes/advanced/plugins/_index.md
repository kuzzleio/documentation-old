## Plugins

Plugins are external components extending Kuzzle with custom features.

There are several types of plugins:

* [Listener plugins](#gt-listener-plugins) listen to events and are supplied with these events data. Cannot change the provided data, and Kuzzle does not wait for them either
* [Workers plugins](#gt-worker-plugins) are just like listener plugins, but they are run on a separate processes. Useful when performing costly operations as they do not imped Kuzzle performances.
* [Pipe plugins](#gt-pipe-plugins) listen to events, and can validate or modify the provided data. Kuzzle waits for pipe plugins before continuing processing data.
* [Controller plugins](#gt-controllers) extend Kuzzle API with new controllers and actions.
* [Protocol plugins](#gt-protocol-plugins) extend Kuzzle networking capabilities by adding new network protocols to it
* [Authentication plugins](#gt-authentication-plugin) add new Kuzzle authentication strategies
