# electron-contextmenu-middleware

[![Greenkeeper badge](https://badges.greenkeeper.io/parro-it/electron-contextmenu-middleware.svg)](https://greenkeeper.io/)

> Build `electron` context menus composing multiple middlewares functions.

[![Travis Build Status](https://img.shields.io/travis/parro-it/electron-contextmenu-middleware.svg)](http://travis-ci.org/parro-it/electron-contextmenu-middleware)
[![NPM module](https://img.shields.io/npm/v/electron-contextmenu-middleware.svg)](https://npmjs.org/package/electron-contextmenu-middleware)
[![NPM downloads](https://img.shields.io/npm/dt/electron-contextmenu-middleware.svg)](https://npmjs.org/package/electron-contextmenu-middleware)

This package born because I've published two other
npm packages for electron that provide different context menu for DOM element.

`electron-input-menu` provide Copy&Paste stuff for `input` element, while `debug-menu` provide a Chrome-like "inspect element" menu for `electron`.

They both work well on their own, but if you want to use them together you can only shown one menu or the other, because they `preventDefault` the contextmenu event. If you remove the `preventDefault` call, then you get both, in sequence.

`electron-contextmenu-middleware` grab menus provided by various other packages (the `middlewares` ones) merge them in a single menu, and `popup` it.


# Installation

```bash
npm install --save electron-contextmenu-middleware
```

# Usage

```js
  // in a renderer electron process,
  // you want to activate context menu provided
  // by `electron-input-menu` and `debug-menu`

  const context = require('electron-contextmenu-middleware');

  const input = require('electron-input-menu');
  const debug = require('debug-menu').middleware;

  context.use(input);
  context.use(debug);
  context.activate();
```

# Write a middleware

To write a `middleware` menu, just export a function
that receives an option object and a next function.

The option object is composed by the right-clicked DOM element, the click x and y coord, and an array of `electron` menu item templates.

Append or insert your menu items to the array in the position you want (or remove existing items inserted by other middlewares) and call `next` when done.


```js
export default function ({elm, menu, click}, next) {
  menu.push({
    label: 'Inspect element',
    click: () => {
      require('electron').remote
        .getCurrentWindow()
        .inspectElement(
          click.x,
          click.y
        );
    }
  });
}
```


# Related projects

* [electron-input-menu](https://github.com/parro-it/electron-input-menu) - Context menu for [electron](https://github.com/atom/electron) input elements.

* [debug-menu](https://github.com/parro-it/debug-menu) - Chrome-like "inspect element" context-menu.


# License

The MIT License (MIT)

Copyright (c) 2016 parro-it
