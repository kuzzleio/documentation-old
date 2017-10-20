---
layout: full.html
algolia: true
title: Getting started
description: learn kuzzle in a few steps
order: 0
---

# Getting started

In this tutorial you will learn in a few steps how to **launch** Kuzzle and how to interact with it by **persisting data** and **being notified** when data is updated.

---

## Running Kuzzle automagically

In this section, we'll learn how to launch Kuzzle the quick way, i.e. via the installation script.

Grab a console and launch the following command

```bash
#!/bin/bash

sudo bash -c "$(curl http://get.kuzzle.io/)"
```

<aside class="notice">
Running a script with <code>sudo</code> is not the only way to install Kuzzle (but is indeed the easiest). To avoid using <code>sudo</code>, you may want to check the <a href="{{ site_base_path }}guide/essentials/installing-kuzzle/">alternative installation methods</a>.
</aside>

This command downloads and executes the installation script with root privileges. The script checks the system for a set of pre-requisites. If necessary, it installs Docker and Docker-compose, then runs Kuzzle.

Once the installation process is complete, the script will greet you with the following message

```bash
# [✔] Kuzzle is running!
```

Your Kuzzle server is now ready to be used. To check it, you can hit the main HTTP API endpoint by browsing the page <a href="http://localhost:7512?pretty=true">http://localhost:7512?pretty=true</a> or via cURL on the command line:

```bash
#!/bin/bash

curl "http://localhost:7512/?pretty=true"
```

Kuzzle will respond you with a list of the existing routes.

<aside class="success">
Kuzzle is up and running. It will accept requests at <code>localhost:7512</code>:
<ul>
  <li>via <strong>standard HTTP requests,</strong></li>
  <li>via a <strong>Websocket</strong> client (like the <a href="https://github.com/kuzzleio/sdk-javascript">Javascript SDK</a>),</li>
  <li>via <strong>Socket.IO</strong> (used as a fallback by the SDK on browsers that do not provide Websocket support).</li>
</ul>
</aside>

<aside class="notice">
Having trouble? 
<ul>
  <li><a href="https://gitter.im/kuzzleio/kuzzle">Get in touch with us on Gitter!</a> We'll be happy to help.</li>
  <li>Check out the <a href="{{ site_base_path }}guide/essentials/installing-kuzzle/">alternative installation methods.</a></li>
</ul>
</aside>

#### Where do we go from here?

Now that Kuzzle is running on your computer, you can dive into playing with it by:

* <a href="{{ site_base_path }}guide/essentials/installing-backoffice">installing the Backoffice</a>, a handy way to manage data and security in Kuzzle;
* installing one of the available <a href="{{ site_base_path }}sdk-reference/">Kuzzle SDK</a> to power-up one of your projects:
 * <a href="https://github.com/kuzzleio/sdk-javascript">Javascript</a> (check the <a href="{{ site_base_path }}guide/getting-started/#sdk-play-time">SDK play time</a> section below),
 * <a href="https://github.com/kuzzleio/sdk-php">PHP</a>,
 * <a href="https://github.com/kuzzleio/sdk-ios">iOS</a>,
 * <a href="https://github.com/kuzzleio/sdk-android">Android</a>;
* exploring the <a href="{{ site_base_path }}api-documentation">Kuzzle API Documentation</a>;
* <a href="{{ site_base_path }}guide/essentials/installing-kuzzle/#manually">setting-up a Kuzzle Server without Docker</a>.

<aside class="notice">
You can also <a href="{{ site_base_path }}guide/essentials/installing-kuzzle/#manually">install Kuzzle manually</a>.
</aside>

---

## SDK play time

It's time to play with the [Kuzzle SDK]({{ site_base_path }}sdk-reference). In this section, we will persist a document and subscribe to notifications in Kuzzle using the JS SDK.

Before proceeding, ensure that your system matches the following requisites:

* A fairly recent version of **NodeJS** (i.e. v6+) should be installed on your system (<a href="https://nodejs.org/en/download/">instructions here</a>),
* A Kuzzle server up and running.

### Prepare your environment

Create your playground directory and install the [Javascript SDK]({{ site_base_path }}sdk-reference) from the command line using npm:

```bash
#!/bin/bash

mkdir "kuzzle-playground"
cd "kuzzle-playground"
npm install kuzzle-sdk
```

Then, create a `create.js` file and start coding:

```javascript
const Kuzzle = require('kuzzle-sdk')

// connect to the Kuzzle server
const kuzzle = new Kuzzle('localhost', {
  defaultIndex: 'playground'
})

kuzzle
  .listIndexesPromise()
  .then(indexes => {
    if (indexes.indexOf('playground') === -1) {
      // playground index not found, create it
      return kuzzle.createIndexPromise('playground')
    }   
  })  
  .then(() => kuzzle.listCollectionsPromise('playground', {type: 'stored'}))
  .then(collections => {
    if (collections.indexOf('mycollection') === -1) {
      // mycollection not found, create it
      return kuzzle.collection('mycollection').createPromise()
    }   
    return kuzzle.collection('mycollection')
  })
```

This code does the following:
* loads the `Kuzzle` SDK from its NPM package,
* creates an instance of the SDK and connects it to the Kuzzle Backoffice running on `localhost` (and selects the `playground` as default index),
* creates the `playground` index if it does not exist,
* creates the `mycollection` collection (within the `playground` index) if it does not exist.

You're now ready to say Hello to the World!

### Create your first "Hello World" document

Append the following instructions to the promises chain

```javascript
kuzzle
  .listIndexesPromise()
  .then(indexes => {
    if (indexes.indexOf('playground') === -1) {
      // playground index not found, create it
      return kuzzle.createIndexPromise('playground')
    }   
  })  
  .then(() => kuzzle.listCollectionsPromise('playground', {type: 'stored'}))
  .then(collections => {
    if (collections.indexOf('mycollection') === -1) {
      // mycollection not found, create it
      return kuzzle.collection('mycollection').createPromise()
    }   
    return kuzzle.collection('mycollection')
  })  
  .then(collection => collection.createDocumentPromise({
    message: 'Hello, World!'
  })) 
  .then(res => {
    console.log('the document has been successfully created')
  })  
  .catch(err => {
    console.error(err.message)
  })  
  .finally(() => kuzzle.disconnect())
```

This code adds the following actions to the previous one:
* creates a new document containing a message saying "Hello, World" in `mycollection` within the `playground` index,
* logs a success message to the console if everything went fine,
* logs an error message if any of the previous actions failed.


Run your file in NodeJS

```bash
#!/bin/bash

node create.js
```

<aside class="success">
You have persisted your first document in Kuzzle. If you are running the Backoffice, you can use it to check the existence of the newly created document.
</aside>

<aside class="notice">
Having trouble? <a href="https://gitter.im/kuzzleio/kuzzle-bo">Get in touch with us on Gitter!</a> We'll be happy to help.
</aside>

_You can find more resources about Kuzzle SDK in the [SDK Documentation]({{ site_base_path }}sdk-reference)._

### Subscribe to data changes (pub/sub)

Kuzzle provides pub/sub features that allow you to be notified in real-time on the state of your data (check the <a href="{{ site_base_path }}sdk-reference/#room">Room Class Documentation</a> for a deep-dive on notifications).

Let's get started. Open a new termnial in the playground directory you created before and create the `subscribe.js` file containing the following code:

```javascript
const Kuzzle = require('kuzzle-sdk')

// connect to the Kuzzle server
const kuzzle = new Kuzzle('localhost', {
    defaultIndex: 'playground'
  })

// create a reference to the data collection
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

Run your file in NodeJS

```bash
#!/bin/bash

node subscribe.js
```

And let it wait for documents entering the scope of the filter.

Now, get back to the previous terminal window and execute once more the `create.js` script. Take a look at the output of the `subscribe.js` script. You will see that, each time a document with a `message` field is persisted in Kuzzle, a [notification]({{ site_base_path }}guide/essentials/real-time) is shown as standard output.

<aside class="success">
You just leveraged Kuzzle's pub/sub mechanism.
</aside>

<aside class="notice">
Having trouble? <a href="https://gitter.im/kuzzleio/kuzzle-bo">Get in touch with us on Gitter!</a> We'll be happy to help.
</aside>


---

## Where do we go from here?

Now that you are started and operational with Kuzzle, you can fully leverage its power by:

* <a href="{{ site_base_path }}sdk-reference">taking a look at the SDK reference</a>;
* <a href="{{ site_base_path }}kuzzle-dsl">mastering the Kuzzle DSL syntax</a> to create incredibly fine-grained and blazing-fast subscriptions;
* <a href="{{ site_base_path }}guide/essentials/user-authentication/#perform-a-basic-login">learning how to perform a login</a>;
* <a href="{{ site_base_path }}guide/essentials/security/">learning how to manage users and set-up fine-grained permission rights</a>.
