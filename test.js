const test = require('tape');
const context = require('./');

test('has a use function', t => {
  t.equal(typeof context.use, 'function');
  t.end();
});

test('has an activate function', t => {
  t.equal(typeof context.use, 'function');
  t.end();
});


test('use require a mw arg of type function', t => {
  t.throws(() => context.use('no way'), /Function middleware argument required./);
  t.end();
});

test('mws get a menu prop', t => {
  context.reset();
  context.use((ctx, next)=> {
    t.ok(Array.isArray(ctx.menu));
    t.end();
    next();
  });
  context.__test.run({}, {});
});


test('mws get a elm prop', t => {
  context.reset();
  context.use((ctx, next)=> {
    t.deepEqual(ctx.elm, {elm: true});
    t.end();
    next();
  });
  context.__test.run({elm: true}, {click: true})
    .catch(err => t.end(err));

});


test('mws get a click prop', t => {
  context.reset();
  context.use((ctx, next)=> {
    t.deepEqual(ctx.click, {click: true});
    t.end();
    next();
  });
  context.__test.run({elm: true}, {click: true})
    .catch(err => t.end(err));
});


test('run return a promise to menu instance', t => {
  context.reset();
  context.use((ctx, next)=> {
    next();
  });
  context.__test.run()
    .then(menu => {
      t.ok(Array.isArray(menu));
      t.end();
    })
    .catch(err => t.end(err));

});


test('mws could alter menu instance', t => {
  context.reset();
  context.use((ctx, next)=> {
    ctx.menu.push('test');
    next();
  });
  context.__test.run()
    .then(menu => {
      t.deepEqual(menu, ['test']);
      t.end();
    })
    .catch(err => t.end(err));

});

