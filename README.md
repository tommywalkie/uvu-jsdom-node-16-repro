# uvu-jsdom-node-16-repro

This is an attempt at reproducing encountered infinite loop issue with UVU and JSDOM, using Node 16.4.0.

```bash
npm install
npm test
```

Logs:

```
> uvu -r esbuild-register tests/ -i setup

This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills
This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills
Sample.test.tsx
• • •   (3 / 3)

  Total:     3
  Passed:    3
  Skipped:   0
  Duration:  70.64ms

Error: The action has timed out.
```

Related thread: [lukeed/uvu#124](https://github.com/lukeed/uvu/issues/124)