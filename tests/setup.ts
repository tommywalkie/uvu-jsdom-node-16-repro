// @ts-nocheck
import { JSDOM } from 'jsdom';

export const jsdom = new JSDOM();

global.window = jsdom.window;
global.document = jsdom.window.document;
global.navigator = jsdom.window.navigator;
global.getComputedStyle = jsdom.window.getComputedStyle;
global.requestAnimationFrame = function(callback) {
  setTimeout(callback, 0);
};
global.cancelAnimationFrame = function(callback) {
  setTimeout(callback, 0);
};

export function reset() {
  window.document.title = '';
  window.document.head.innerHTML = '';
  window.document.body.innerHTML = '<main></main>';

  jsdom.reconfigure({
    url: 'https://www.test.com/',
  });
}
