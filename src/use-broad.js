/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */
import { useState, useMemo } from 'react';

/* -------------------------- Internal Dependencies ------------------------- */
import useMount from './use-mount';

const useBroadState = store => {
  /**
   * Create a state to subscribe to and get the initial value
   * form the subscribed state
   */
  const [state, setGlobal] = useState(store.get());

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
  const setState = useMemo(() => state => store.set(state), [store]);

  /**
   * Return the value and updater
   */
  return [state, setState];
};

export default useBroadState;
