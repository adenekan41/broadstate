/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */
import { useState, useCallback } from 'react';
import { Observable } from 'create-observable';

/* -------------------------- Internal Dependencies ------------------------- */
import useMount from './use-mount';

const useBroadState = <T extends unknown>(store: Observable<T>) => {
  /**
   * Create a state to subscribe to and get the initial value
   * form the subscribed state
   */
  const [state, setGlobal] = useState<T>(store.get());

  /**
   * Get the value of the subscribed state once component it's mounted only
   */
  useMount(() => {
    return store.subscribe(setGlobal);
  });

  /**
   * Create an updater function that allows us to subscribe to
   * the state and update the observed value.
   */
  const setState = useCallback((state: T) => store.set(state), [store]);

  /**
   * Return the value and updater
   */
  return [state, setState] as [T, typeof setState];
};

export default useBroadState;
