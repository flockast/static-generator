Static generator
===========

> webpack with htmlwebpackplugin

## Requirements
You only need <b>node.js</b> pre-installed and you’re good to go.

## Technologies
- webpack
- babel
- ejs
- sass
- postcss (autoprefixer)

## Setup
Install dependencies
```sh
$ npm install
```
or
```sh
$ yarn
```
## Configure
<b>routing.json</b> ~ {"link" : "filename"}. Example:
```sh
{
  "routing": [
    { "/": "index" },
    { "/about": "about" },
    { "/category/post": "category/post" }
  ]
}
```

## Development
Run the local webpack-dev-server with livereload and autocompile on [http://localhost:8080/](http://localhost:8080/)
```sh
$ npm run dev
```
or
```sh
$ yarn dev
```

## Deployment
Build the current application
```sh
$ npm run build
```
or
```sh
$ yarn build
```
