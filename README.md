# database-frontend

> Final Project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
# if you plan on viewing the website, this is the one you'll want to use.
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

All the source code that we've written for this site is in /src/components, /src/chartLoader, and /server/apiRoutes.js.

> The components folder contains all the pages and their components. In the scripts section of each, you'll see where we make the api requests.

> The chartLoader.js file defines the base styles for the charts that we can then load our data into.

> The apiRoutes.js defines all the GET and POST locations that then call our SQL Stored Procedures.
