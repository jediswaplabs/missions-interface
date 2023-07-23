/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import '@testing-library/jest-dom';
import { enableFetchMocks } from 'jest-fetch-mock';

enableFetchMocks();

const prepareCanvasMock = () => { // NOTE: This is required in order to prevent exceptions within Jest whenever we use canvas elements. The official node `canvas` package would have been preferred, however it requires node-gyp native compilation which is failing on KVMs/GitLab CI.
  const createElement = document.createElement.bind(document);
  document.createElement = (tagName) => {
    if (tagName !== 'canvas') { return createElement(tagName); }
    const result = {
      getContext: () => ({}),
      measureText: () => ({}),
    };
    return result;
  };
};
prepareCanvasMock();

window.HTMLFormElement.prototype.submit = () => {}; // NOTE: This prevents an error from jsdom: `Error: Not implemented: HTMLFormElement.prototype.submit`
global.console.debug = jest.fn(); // NOTE: This prevents our test console output from being spammed by debug log messages
global.console.info = jest.fn(); // NOTE: This prevents our test console output from being spammed by info log messages

jest.setTimeout(20000);

const warningNotWrappedInActErrorToIgnoreRegexp = /Warning.*not wrapped in act/;
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (warningNotWrappedInActErrorToIgnoreRegexp.test(args[0])) { return; }
    originalError.call(console, ...args);
  };
});
afterAll(() => {
  console.error = originalError;
});
