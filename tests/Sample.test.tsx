import React from "react";
import { test } from "uvu";
import * as assert from "uvu/assert";
import { JSDOM } from 'jsdom';
import { render as renderJSX, screen } from "@testing-library/react";
import { Processor } from "windicss/lib";
import { HTMLParser } from "windicss/utils/parser";

const jsdom = new JSDOM();
const {window} = jsdom;

// @ts-expect-error TS2322
global.window = window;
global.document = window.document;
// @ts-expect-error TS2740
global.navigator = {userAgent: 'node.js'};
global.requestAnimationFrame = callback => setTimeout(callback, 0);
global.cancelAnimationFrame = id => clearTimeout(id);

function reset() {
  window.document.title = '';
  window.document.head.innerHTML = '';
  window.document.body.innerHTML = '<main></main>';

  jsdom.reconfigure({
    url: 'https://www.test.com/',
  });
}

test.before(() => {
  console.log('SETUP');
});

test.after(() => {
  console.log('CLEANUP');
});

test.before.each(() => {
  console.log('>> BEFORE');
  reset();
});

test.after.each(() => {
  console.log('>> AFTER');
});

/**
 * Render React node around a JSDOM context, while applying
 * appropriate WindiCSS styles.
 */
function render(el: JSX.Element) {
  const res = renderJSX(el);
  const htmlClasses = new HTMLParser(document.body.innerHTML)
    .parseClasses()
    .map(i => i.result)
    .join('');
  const processor = new Processor();
  const interpretedSheet = processor.interpret(htmlClasses).styleSheet;
  const styles = interpretedSheet.build(true);
  const css = document.createElement('style');
  css.textContent = styles;
  document.head.appendChild(css);
  return res;
}

test('sum', () => {
	assert.is(1 + 1, 2);
});

test('render a React component', () => {
	const Sample: React.FC = () => {
		return <div>Hello world</div>
	};
	render(<Sample/>);
	assert.ok(screen.getByText('Hello world'));
});

test('render a React component and register WindiCSS styles', () => {
	const Sample: React.FC = () => {
		return <div className="px-2">Hello world</div>
	};
	render(<Sample/>);
	assert.ok(screen.getByText('Hello world'));
  assert.is(document.head.innerHTML, '<style>.px-2{padding-left:0.5rem;padding-right:0.5rem}</style>');
});

test.run();