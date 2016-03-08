const test = require('tape');
const electronContextmenuMiddleware = require('./');

test('it work!', t => {
  const result = electronContextmenuMiddleware();
  t.equal(result, 42);
  t.end();
});
