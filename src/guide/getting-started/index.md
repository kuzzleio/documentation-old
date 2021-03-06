---
layout: full.html.hbs
algolia: true
title: Getting Started
description: learn kuzzle in a few steps
order: 0
---

# Getting Started

In this tutorial you will learn how to install, run and use **Kuzzle** in just a few steps. We will walk you through creating an app that can **store** documents in Kuzzle and generate a **notification** for each new document.

## Running Kuzzle

In this section we'll learn how to quickly get Kuzzle up and running using our installation script.

Open a terminal and run the following command:

```bash
bash -c "$(curl http://get.kuzzle.io/)"
```

This command downloads and executes the installation script using root privileges. The script checks the system for a set of prerequisites and installs any necessary tools, like Docker or Docker Compose. When the installation is complete it will automatically run Kuzzle.

<aside class="notice">
There are also more <a href="{{ site_base_path }}guide/essentials/installing-kuzzle/">alternative ways</a> to install Kuzzle.
</aside>

This command downloads, installs and runs Kuzzle.

Use the `--no-run` option to prevent the script from running Kuzzle.

Once the installation process is complete, you will see the following message:

```bash
# Kuzzle is now running
```

Your Kuzzle is now running! To test it, you can explore the main HTTP API by clicking this <a href="http://localhost:7512?pretty=true">link</a> or by using cURL on the command line:

```bash
curl "http://localhost:7512/?pretty=true"
```

If everything is working you should see a JSON document that contains a list of API endpoints.

<aside class="success">
Congratulations! You have completed the Kuzzle installation, it will now accept requests on <code>localhost:7512</code>:
<ul>
  <li>via <strong>HTTP</strong></li>
  <li>via <strong>Websocket</strong> clients (use our <a href="https://github.com/kuzzleio/sdk-javascript">Javascript SDK</a>)</li>
  <li>via <strong>Socket.io</strong></li>
</ul>
</aside>

<aside class="notice">
Having trouble?
<ul>
  <li>Get in touch with us on <a href="https://gitter.im/kuzzleio/kuzzle">Gitter!</a> We're happy to help.</li>
  <li>Try one of <a href="{{ site_base_path }}guide/essentials/installing-kuzzle/">these</a> alternative installation methods.</li>
</ul>
</aside>

#### Helper scripts for systemd

If you want to run Kuzzle automatically at startup there are a few scripts that help you do this with systemd.

If you want to run Kuzzle automatically at startup there are a few scripts in `$PWD/kuzzle/script/` that help you do this with systemd:

* Run the `add-kuzzle-boot-systemd.sh` as root to add a service inside /etc/systemd/system that will start Kuzzle on boot.
* Run the `remove-kuzzle-boot-systemd.sh` as root to remove the service so that Kuzzle won't start on boot.

#### What now?

Now that Kuzzle is up and running, you can start playing around with it:

* install <a href="{{ site_base_path }}guide/essentials/installing-console">Kuzzle Admin Console</a>, a handy way to manage data and security in your Kuzzle installation
* install a <a href="{{ site_base_path }}sdk-reference/">Kuzzle SDK</a> to power-up one of your projects:
 * <a href="https://github.com/kuzzleio/sdk-javascript">Javascript</a> (check the <a href="{{ site_base_path }}guide/getting-started/#fun-with-sdks">Fun with SDKs</a> section below),
 * <a href="https://github.com/kuzzleio/sdk-php">PHP</a>,
 * <a href="https://github.com/kuzzleio/sdk-android">Android</a>;
* explore the <a href="{{ site_base_path }}api-documentation">Kuzzle API</a> documentation
* install Kuzzle <a href="{{ site_base_path }}guide/essentials/installing-kuzzle/#manual-installation">without Docker</a>

## Fun with SDKs

It's time to play with the [Kuzzle SDK]({{ site_base_path }}sdk-reference). In this section, we will store a document and subscribe to notifications in Kuzzle using the Javascript SDK.

Before proceeding, please make sure your system has these programs installed:

* **Node.js** version 6 or higher (<a href="https://nodejs.org/en/download/">instructions here</a>)
* Kuzzle

### Prepare your environment

Create your playground directory and install the [Javascript SDK]({{ site_base_path }}sdk-reference) from the command line using npm:

```bash
mkdir "kuzzle-playground"
cd "kuzzle-playground"
npm install kuzzle-sdk
```

<aside class="notice">
If you are performing a clean install you might see some `UNMET PEER DEPENDENCY` warnings, these are safe to ignore as they refer to optional dependencies.
</aside>

Then, create an `init.js` file and start by adding the code below. This will load the Kuzzle Javascript SDK:

```javascript
const Kuzzle = require('kuzzle-sdk')
```

Next we will instantiate a client that will automatically connect to Kuzzle via websockets. If Kuzzle is not running on localhost, replace it with the corresponding server name or ip address. Here we also specify 'playground' as the default index that the client will query:

```javascript
const kuzzle = new Kuzzle('localhost', {defaultIndex: 'playground'})
```

Next we will add a listener to detect if there is a problem with our connection to Kuzzle:

```javascript
kuzzle.on("networkError",function(error){
  console.error("Network Error:"+error);
})
```

Finally, we will add the code that will access Kuzzle to create a new index 'playground' and a new collection 'mycollection' that we will use to store data later on.

```javascript
kuzzle
  .createIndexPromise('playground')
  .then(() => kuzzle.collection('mycollection').createPromise())
  .then(() => {
    console.log('playground/mycollection ready')
  })  
  .catch(err => {
    console.error(err.message)
  })  
  .finally(() => kuzzle.disconnect())
```

Your `init.js` file should now look like this:

```javascript
// load the Kuzzle SDK module
const Kuzzle = require('kuzzle-sdk')

// instantiate a Kuzzle client, this will automatically connect to the Kuzzle server
const kuzzle = new Kuzzle('localhost', {defaultIndex: 'playground'})

// add a listener to detect any connection problems
kuzzle.on("networkError",function(error){
  console.error("Network Error:"+error);
})

// create a 'playground' index and then a collection named 'mycollection' that we can use to store data
kuzzle
  .createIndexPromise('playground')
  .then(() => kuzzle.collection('mycollection').createPromise())
  .then(() => {
    console.log('playground/mycollection ready')
  })  
  .catch(err => {
    console.error(err.message)
  })  
  .finally(() => kuzzle.disconnect())
```

This code does the following:
* loads the `Kuzzle SDK` from its NPM package
* creates an instance of the SDK and connects it to Kuzzle running on `localhost` (and selects the `playground` as default index),
* creates the `playground` index,
* creates the `mycollection` collection (within the `playground` index),
* disconnects from Kuzzle after the collection is created or if an error occurs.

Run your file in Node.js

```bash
node init.js
```

Your console should output the following message:

```bash
playground/mycollection ready
```

<aside class="success">
Congratulations! You are now ready to say Hello to the World!
</aside>

<aside class="notice">
Having trouble? Get in touch with us on <a href="https://gitter.im/kuzzleio/kuzzle">Gitter!</a> We're happy to help.
</aside>

### Create your first "Hello World" document

Create a `create.js` file with following code:

```javascript
// load the Kuzzle SDK module
const Kuzzle = require('kuzzle-sdk')

// instantiate a Kuzzle client, this will automatically connect to the Kuzzle server
const kuzzle = new Kuzzle('localhost', {defaultIndex: 'playground'})

// create an object that contains the message we want to store
const message = {message: "Hello, World!"}

// create a document in the 'mycollection' collection
kuzzle.collection('mycollection')
  .createDocumentPromise(message)
  .then(res => {
    console.log('the following document has been successfully created:\n', message)
  })
  .catch(err => {
    console.error(err.message)
  })
  .finally(() => kuzzle.disconnect())
```

This code does the following:
* creates a new document containing the message "Hello, World" in `mycollection` within the `playground` index,
* logs a success message to the console if everything went fine,
* logs an error message if any of the previous actions failed,
* disconnects from Kuzzle after the document is created or if an error occurs.

Run your file in Node.js

```bash
node create.js
```

<aside class="success">
You have now successfully stored your first document into Kuzzle. Click <a href="{{ site_base_path }}guide/essentials/installing-console">here</a> to see how you can use the
  <strong>Kuzzle Admin Console</strong> to browse your collection and confirm that your document was saved.
</aside>

<aside class="notice">
Having trouble? Get in touch with us on <a href="https://gitter.im/kuzzleio/kuzzle">Gitter!</a> We're happy to help.
</aside>

_You can find more resources about Kuzzle SDK in the [SDK Reference]({{ site_base_path }}sdk-reference)._

### Subscribe to data changes (pub/sub)

Kuzzle provides pub/sub features that can be used to trigger real-time notifications based on the state of your data (for a deep-dive on notifications check out the **Room** class definition in the <a href="{{ site_base_path }}sdk-reference/room">SDK Reference</a>).

Let's get started. Create a `subscribe.js` file with following code:

```javascript
// load the Kuzzle SDK module
const Kuzzle = require('kuzzle-sdk')

// instantiate a Kuzzle client, this will automatically connect to the Kuzzle server
const kuzzle = new Kuzzle('localhost', {defaultIndex: 'playground'})

// create a reference to the 'mycollection' collection
const collection = kuzzle.collection('mycollection')

// define a filter
const filter = {
    exists: {
        field: 'message'
    }
}

// create a subscription on the collection matching given filters
collection.subscribe(filter, (error, result) => {
    // this function is called each time kuzzle notifies us with a document matching our filters
    console.log('message received from kuzzle:', result)
})
```

Run your file in Node.js

```bash
node subscribe.js
```

Your `subscribe.js` app is now running and monitoring any documents that match the filter, specifically documents that have a `message` field.

Now in another terminal, launch the `create.js` file that we created in the previous section.

```bash
node create.js
```

This will create a new document in Kuzzle which will trigger a [notification]({{ site_base_path }}guide/essentials/real-time) in the `subscribe.js` app. Check the `subscribe.js` terminal to make sure a new log appears every time a document is created using the `create.js` app:

```bash
message received from kuzzle: { status: 200,
  requestId: '02042a18-927b-43a1-98e3-e1637e2a1447',
  timestamp: 1515590928775,
  ...}
```

<aside class="success">
Congratulations! You have just choreographed your first pub/sub pattern!
</aside>

<aside class="notice">
Having trouble? Get in touch with us on <a href="https://gitter.im/kuzzleio/kuzzle">Gitter!</a> We're happy to help.
</aside>

## Where do we go from here?

Now that you're more familiar with Kuzzle, dive even deeper to learn how to leverage its full capabilities:

* take a look at the <a href="{{ site_base_path }}sdk-reference">SDK Reference</a>
* learn how to use <a href="{{ site_base_path }}kuzzle-dsl">Koncorde</a> to create incredibly fine-grained and blazing-fast subscriptions
* follow our guide to learn how to implement <a href="{{ site_base_path }}guide/essentials/user-authentication/#local-strategy">basic authentication</a>
* follow our guide to learn how to implement <a href="{{ site_base_path }}guide/essentials/security/">manage users and setup fine-grained access control</a>
