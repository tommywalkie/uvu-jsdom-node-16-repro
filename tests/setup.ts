// @ts-nocheck
import { JSDOM } from 'jsdom';

export const jsdom = new JSDOM();

global.window = jsdom.window;
global.document = jsdom.window.document;
global.navigator = jsdom.window.navigator;
global.getComputedStyle = jsdom.window.getComputedStyle;

let i = 0, j = 0;
global.requestAnimationFrame = function(_) {
  i++;
  return i;
};
global.cancelAnimationFrame = function(_) {
  j++;
  return j;
};

export function reset() {
  window.document.title = '';
  window.document.head.innerHTML = '';
  window.document.body.innerHTML = '<main></main>';

  jsdom.reconfigure({
    url: 'https://www.test.com/',
  });
}
