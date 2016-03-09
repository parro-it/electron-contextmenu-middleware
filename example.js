'use strict';
const electron = require('electron');

electron.app.on('ready', () => {
  const win = new electron.BrowserWindow({
    show: true
  });

  win.webContents.executeJavaScript(`
    const context = require('${__dirname}');

    context.use((ctx, next) => {
      ctx.menu.push({
        label: 'Test 1',
        click: () => alert('Test 1 clicked')
      });
      next();
    });

    context.use((ctx, next) => {
      if (ctx.elm.matches('input')) {
        ctx.menu.push({
          label: 'Test 2',
          click: () => alert('Test 2 clicked')
        });
        next();
      }

    });

    context.activate();

  `);

  win.loadURL('https://google.com');
});
