import "./setup";
import React from "react";
import { test } from "uvu";
import * as assert from "uvu/assert";
import { render as renderJSX, screen } from "@testing-library/react";
import { Processor } from "windicss/lib";
import { HTMLParser } from "windicss/utils/parser";
import { reset } from "./setup";

test.before.each(reset);

// Workaround from https://github.com/lukeed/uvu/issues/124#issuecomment-912070397
test.after(() => {
  setTimeout(() => {
    process.exit(0);
  }, 500);
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