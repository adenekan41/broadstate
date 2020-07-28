/* -------------------------- External Dependencies ------------------------- */
import React from 'react';
import { render, act } from '@testing-library/react';

/* -------------------------- Internal Dependencies ------------------------- */
import createObservable from '../src/create-observable';
import useBroadState from '../src/use-broad';

function setup(...args) {
  const returnVal = {};
  let set;
  function TestComponent() {
    const [state, setState] = useBroadState(...args);
    Object.assign(returnVal, state);
    set = setState;
    return null;
  }
  render(<TestComponent />);

  return [returnVal, set];
}

test('allows set time', () => {
  const [state, useBroadStateData] = setup(createObservable({ time: 0 }));
  // assert initial state
  expect(state).toHaveProperty('time');
  expect(state.time).toBe(0);
  // add second value

  act(() => {
    useBroadStateData({ time: 2 });
  });

  expect(state).toHaveProperty('time');
  expect(state.time).toBe(2);

  act(() => {
    useBroadStateData({ time: 4 });
  });
  expect(state).toHaveProperty('time');
  expect(state.time).toBe(4);
});
