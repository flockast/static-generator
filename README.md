Static generator
===========

> webpack with htmlwebpackplugin

## Requirements
You only need <b>node.js</b> pre-installed and you’re good to go.

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
In <b>./config.json</b> you can change routing (add or remove routes). Example:
```sh
{
  "routing": [
    { "/": "index" },
    { "/about": "about" },
    { "/category/post": "category/post" }
  ]
}
```
"link" : "filename"

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
