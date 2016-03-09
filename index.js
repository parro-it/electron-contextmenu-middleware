'use strict';

const CoMws = require('comws');
let context = new CoMws();
const electron = require('electron');
const remote = electron.remote;
const Menu = remote.Menu;


function run(elm, click) {
  const menu = [];
  return context
    .run({menu, elm, click})
    .then(() => menu);
}

function onContextmenu(e) {
  e.preventDefault();
  e.stopPropagation();

  const click = {x: e.x, y: e.y};
  const elm = e.target;

  run(elm, click)
    .then(template => {
      if (template.length > 0) {
        const menu = Menu.buildFromTemplate(template);
        menu.popup(remote.getCurrentWindow(), click.x, click.y);
      }

    })
    .catch(err => process.stderr.write(err.stack + '\n'));
}

exports.reset = function reset() {
  context = new CoMws();
};

exports.use = function use(mw) {
  if (typeof mw !== 'function') {
    throw new Error('Function middleware argument required.');
  }
  context.use(mw);
  return mw;
};

exports.activate = function activate() {
  if (document.body) {
    document.body.addEventListener('contextmenu', onContextmenu);
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      document.body.addEventListener('contextmenu', onContextmenu);
    });
  }

};

exports.__test = { run };

