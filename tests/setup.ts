import { JSDOM } from 'jsdom';

const jsdom = new JSDOM();
const {window} = jsdom;

// @ts-expect-error TS2322 🤷‍♂️
global.window = window;
global.document = window.document;
// @ts-expect-error TS2740 🤷‍♂️
global.navigator = {userAgent: 'node.js'}
global.requestAnimationFrame = callback => setTimeout(callback, 0);
global.cancelAnimationFrame = id => clearTimeout(id);

export { jsdom }

export function reset() {
  window.document.title = '';
  window.document.head.innerHTML = '';
  window.document.body.innerHTML = '<main></main>';

  jsdom.reconfigure({
    url: 'https://www.test.com/',
  });
}
