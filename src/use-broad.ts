/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */
import { IObservable } from 'create-observable';
import { useState, useCallback } from 'react';

/* -------------------------- Internal Dependencies ------------------------- */
import useMount from './use-mount';

const useBroadState = <T extends unknown>(store: IObservable<T>) => {
  /**
   * Create a state to subscribe to and get the initial value
   * form the subscribed state
   */
  const [state, setGlobal] = useState<T>(store.get());

  /**
   * Get the value of the subscribed state once component
   * is mounted only
   */
  useMount(() => {
    return store.subscribe(setGlobal);
  });

  /**
   * Create an updater function that allows us to subcribe to
   * the state and update the observed value.
   */
  const setState = useCallback((state: T) => store.set(state), [store]);

  /**
   * Return the value and updater
   */
  return [state, setState] as const;
};

export default useBroadState;
