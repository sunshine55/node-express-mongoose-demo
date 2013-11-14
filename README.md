# Nodejs Tutorial

This is a demo node.js application illustrating various features used in everyday web development, with a fine touch of best practices. The demo app is a blog application where users (signing up using facebook, twitter, github and simple registrations) can create an article, delete an article and add comments on the article.

Read the [wiki](https://github.com/madhums/node-express-mongoose/wiki) (or the [old blog post](http://madhums.me/2012/07/19/breaking-down-app-js-file-nodejs-express-mongoose/)) for the application architecture.

Want to build something from scratch? use the [boilerplate app](https://github.com/madhums/node-express-mongoose)

Checkout the [apps that are built using this approach](https://github.com/madhums/node-express-mongoose/wiki/Apps-built-using-this-approach)

## Install

**NOTE:** You need to have node.js and mongodb installed and running.

```sh
  $ git clone git://github.com/sunshine55/nodejs-tutorial.git
  $ cd /path/to/nodejs-tutorial
  $ npm install
  $ node server.js
```

Then visit [http://localhost:3000/](http://localhost:3000/)

## Related modules

1. [node-genem](https://github.com/madhums/node-genem) A module to generate the MVC skeleton using this approach.
2. [node-notifier](http://github.com/madhums/node-notifier) - used for notifications via emails and push notificatiions
3. [node-imager](http://github.com/madhums/node-imager) - used to resize, crop and upload images to S3/rackspace
4. [node-view-helpers](http://github.com/madhums/node-view-helpers) - some common view helpers
5. [mongoose-migrate](https://github.com/madhums/mongoose-migrate#readme) - Keeps track of the migrations in a mongodb collection (fork of visionmedia/node-migrate)
6. [mongoose-user](http://github.com/madhums/mongoose-user) - Generic methods, statics and virtuals used for user schemas