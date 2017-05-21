---
layout: full.html
algolia: true
title: Listening asynchronously
order: 100
---

# Listening asynchronously

Plugins enable you to add asynchronous listener functions to a set of [events]({{ site_base_path }}plugins-reference/kuzzle-events-list). We'll call these asynchronous listener functions **hooks** from now on.

Hooks are supplied with these events data. They cannot change the provided data, and Kuzzle does not wait for them to process the data either.

Hooks are declared in the `hooks` property of the Plugin class, where the keys of the object are event names and the values are the names of the corresponding listeners.
Each hook must also be exported.

---

## Executing hooks in separate threads

Plugins declaring hooks can also be executed in separate threads. This is handy when they perform heavy computations that may corrupt the performances of the Kuzzle Core.

To achieve this, Kuzzle must specify a `threads` property in the [custom configuration]({{ site_base_path }}guide/essentials/configuration) of the Plugin.

```json
{
  "plugins": {
    "kuzzle-plugin-blabla": {
      "threads": 1
    }
  }
}
```

If this number of threads is greater than 0, Kuzzle will launch the plugin on as many separate threads.  
If there are more than 1 thread for that plugin, each time a listened event is fired, Kuzzle will pick one thread to notify using round-robin.

<aside class="notice">
As the Plugin is isolated in separated processes, the <a href="{{ site_base_path }}plugins-reference/plugins-context">plugin context</a> provided to worker plugins do not contain <code>accessors</code>
</aside>


---

## TL;DR plugin skeleton

```javascript
function HookPlugin () {
  /*
    This exposed "hooks" property tells Kuzzle that it needs to
    attach the plugin function "myFunction" to the Kuzzle event
    "eventType:hookName"

    The function "myFunction" will be called whenever the event
    "eventType:hookName" is fired.
   */
  this.hooks = {
    'eventType:hookName': 'myFunction'
  };

  /*
   Required plugin initialization function
   (see the "Plugin prerequisites" section)
   */
  this.init = function (customConfig, context) {
    // initializes the plugin
  };

  /*
   The configured function to call whenever the
   "eventType:hookName" event is fired
   */
  this.myFunction = function (message, event) {
    console.log(`Event ${event} triggered`);
    console.log(`Message received: ${message}`);
  };
}

// Exports the plugin objects, allowing Kuzzle to instantiate it
module.exports = HookPlugin;
```
