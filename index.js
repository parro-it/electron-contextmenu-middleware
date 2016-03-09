'use strict';

const CoMws = require('comws');
let context = new CoMws();


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

};

function run(elm, click) {
  const menu = [];
  return context
    .run({menu, elm, click})
    .then(() => menu);
}

exports.__test = { run };

