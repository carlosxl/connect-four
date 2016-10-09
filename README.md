# connect-four

A javascript plugin that insert a mini game "Connect Four" into web page in a `<canvas>` element.

Visit this [wiki page](https://en.wikipedia.org/wiki/Connect_Four) for a detailed description of the game.

## Demo

Take a quick look at the [demo page](https://carlosxl.github.io/connect-four/).

## Usage

Insert the following HTML snippet into your web page:
```html
<div id="app"></div>
```
Add a script tag:
```html
<script type="text/javascript" src="<path-to-your>/app.min.js"></script>
```
and that's it!

## Customize and Re-build
If you want to customize or extend the game, patch the scripts in `/src` and run:
```
$ NODE_ENV=production webpack
```
to re-build the `app.min.js`.

While developing the app, run:
```
$ npm run dev
```
which will fire up a --hot --inline webpack-dev-server on your `localhost:8080`.
