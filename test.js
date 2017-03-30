import test from 'ava';
import context from './';

test('has a use function', t => {
	t.is(typeof context.use, 'function');
});

test('has an activate function', t => {
	t.is(typeof context.use, 'function');
});

test('use require a mw arg of type function', t => {
	t.throws(() => context.use('no way'), /Function middleware argument required./);
});

test('mws get a menu prop', t => {
	context.reset();
	context.use((ctx, next) => {
		t.true(Array.isArray(ctx.menu));
		next();
	});
	context.__test.run({}, {});
});

test('mws get a elm prop', async t => {
	context.reset();
	context.use((ctx, next) => {
		t.deepEqual(ctx.elm, {elm: true});
		next();
	});
	await context.__test.run({elm: true}, {click: true});
});

test('mws get a click prop', async t => {
	context.reset();
	context.use((ctx, next) => {
		t.deepEqual(ctx.click, {click: true});
		next();
	});
	await context.__test.run({elm: true}, {click: true});
});

test('run return a promise to menu instance', async t => {
	context.reset();
	context.use((ctx, next) => {
		next();
	});
	const menu = await context.__test.run();
	t.true(Array.isArray(menu));
});

test('mws could alter menu instance', async t => {
	context.reset();
	context.use((ctx, next) => {
		ctx.menu.push('test');
		next();
	});
	const menu = await context.__test.run();
	t.deepEqual(menu, ['test']);
});

