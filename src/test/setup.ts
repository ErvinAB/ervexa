import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

/**
 * React only runs updates through `act` when it has been told it is in a test
 * environment. Without this flag React 19 logs an act() warning and, worse,
 * state updates made outside `act` can be dropped before assertions read them.
 */
declare global {
  // eslint-disable-next-line no-var
  var IS_REACT_ACT_ENVIRONMENT: boolean;
}

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});
