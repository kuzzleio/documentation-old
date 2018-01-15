---
layout: full.html
algolia: true
title: Installing Kuzzle Console
order: 100
---

# Installing Kuzzle Console

The Kuzzle Console is a web application that lets you manage your Kuzzle Backend, including **data**, **real-time notifications** and **security**.

If you don't want to install Kuzzle Console yourself you can use our <a href="http://kuzzle-backoffice.netlify.com/">publicly hosted</a>  Kuzzle Console. Otherwise, grab the source code [here](https://github.com/kuzzleio/kuzzle-backoffice/releases) and install it on your own environment.

In both cases the configuration is the same and you'll be able to select which <a href="{{ site_base_path }}guide/essentials/installing-backoffice/#select-the-kuzzle-server-to-connect-to">Kuzzle Backend</a> installation that you want to manage.

<aside class="notice">
Having trouble? Get in touch with us on <a href="https://gitter.im/kuzzleio/kuzzle">Gitter!</a> We're happy to help.
</aside>

## Configure Kuzzle Backend Connection

The Kuzzle Console automatically searches for Kuzzle Backend on `localhost:7512` and will be prompt you to introduce your own host and port if it is not detected.

At any time, you can reconfigure Kuzzle Console to connect to any Kuzzle Backend installation by clicking on the **"Choose Environment"** dropdown menu and then selecting **"Create new"**. This feature allows you to manage multiple Kuzzle Backend installations on a single Kuzzle Console.

![Kuzzle Console is trying to connect to Kuzzle Backend]({{ site_base_path }}assets/images/kuzbo-connecting.png)

To create a connection to Kuzzle Backend, provide its **name** (e.g. "Development" or "My First Kuzzle"), **address** (or hostname) and **port**. Optionally, select a **color** to identify the connection (e.g. red could be used to identify production environments).

<aside class="success">Your Kuzzle Console is now connected to Kuzzle Backend.</aside>

<aside class="notice">
Having trouble? Get in touch with us on <a href="https://gitter.im/kuzzleio/kuzzle">Gitter!</a> We're happy to help.
</aside>

## Create an Admin Account

At this point the Kuzzle Backend is not secure and any `anonymous` user has full access. The Kuzzle Console configurator will automatically request that an Admin Account be created. For the purpose of this tutorial, leave the **reset default and anonymous rights** unchecked, as we will use the `anonymous` account in the next steps.

![Kuzzle Console requests that an admin account be created]({{ site_base_path }}assets/images/kuzbo-firstadmin.png)

Once the Admin Account credentials have been created, use them to login.

<aside class="success">You can now manage Kuzzle Backend via the Console.</aside>

<aside class="notice">
Having trouble? Get in touch with us on <a href="https://gitter.im/kuzzleio/kuzzle">Gitter!</a> We're happy to help.
</aside>
