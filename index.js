'use strict';

const CoMws = require('comws');

let context = new CoMws();

function run(elm, click) {
	const menu = [];
	return context
		.run({menu, elm, click})
		.then(() => menu);
}

function onContextmenu(e) {
	const electron = require('electron');
	const remote = electron.remote;
	const Menu = remote.Menu;
	const click = {x: e.x, y: e.y};
	const elm = e.target;

	run(elm, click)
		.then(template => {
			if (template.length > 0) {
				e.preventDefault();
				e.stopPropagation();

				const menu = Menu.buildFromTemplate(template);
				menu.popup(remote.getCurrentWindow(), click.x, click.y);
			}
		})
		.catch(err => process.stderr.write(err.stack + '\n'));
}

function reset() {
	context = new CoMws();
}

function use(mw) {
	if (typeof mw !== 'function') {
		throw new TypeError('Function middleware argument required.');
	}
	context.use(mw);
	return mw;
}

function activate() {
	if (document.body) {
		document.body.addEventListener('contextmenu', onContextmenu);
	} else {
		document.addEventListener('DOMContentLoaded', () => {
			document.body.addEventListener('contextmenu', onContextmenu);
		});
	}
}

module.exports = {
	activate, use, reset,
	__test: {run}
};

