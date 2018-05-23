---
layout: full.html.hbs
algolia: true
title: Listen Asynchronously
order: 100
---

# Listening Asynchronously

Plugins allow you to add asynchronous listener functions to a set of [events]({{ site_base_path }}kuzzle-events/). We call these asynchronous listener functions **hooks**.

Kuzzle will execute these hooks and then continue processing, not waiting for the hook to return a result. The hook will receive event data that can be used in the context of the hook but cannot be changed to affect the current Kuzzle process.

Hooks are declared in the `hooks` property of the Plugin class, which accepts an object who's keys are the name of the events to listen to and values are the names of the corresponding functions to execute.

---

## Executing Hooks in Separate Threads

{{{deprecated "1.0.0"}}}

Plugins that declare hooks can be executed in a separate thread from that of the Kuzzle process. This is handy when you want to perform heavy computations that can have a negative impact on Kuzzle's performance.

To achieve this, Kuzzle must specify a `threads` property in the [custom configuration]({{ site_base_path }}guide/essentials/configuration) of the Plugin.

```json
{
  "plugins": {
    "kuzzle-plugin-worker": {
      "threads": 1
    },
    "kuzzle-plugin-listener": {
      "threads": 0
    }
  }
}
```

If this number of threads is greater than 0, Kuzzle will launch the plugin on up to that number of separate threads.  
If there is more than one thread for a single plugin, Kuzzle will use round-robin scheduling to select a thread each time an event is triggered.

<aside class="notice">
Since the Plugin is isolated in separate processes, the <a href="{{ site_base_path }}plugins-reference/plugins-context">plugin context</a> provided to worker plugins does not contain <code>accessors</code>
</aside>


---

## Plugin Sample

```javascript
class HookPlugin {
  constructor () {
    /*
      This exposed "hooks" property tells Kuzzle that it needs to
      attach the plugin function "myFunction" to the Kuzzle event
      "eventType:hookName"

      The function "myFunction" will be called whenever the event
      "eventType:hookName" is triggered.
     */
    this.hooks = {
      'eventType:hookName': 'myFunction'
    };
  }

  /*
   Required plugin initialization function
   (see the "Plugin prerequisites" section)
   */
  init (customConfig, context) {
    // initializes the plugin
  }

  /*
   The configured function to call whenever the
   "eventType:hookName" event is triggered
   */
  myFunction (message, event) {
    console.log(`Event ${event} triggered`);
    console.log(`Message received: ${message}`);
  }
}

// Exports the plugin objects, allowing Kuzzle to instantiate it
module.exports = HookPlugin;
```
