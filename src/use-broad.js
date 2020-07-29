/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */
import { useState, useMemo } from 'react';
import useMount from './use-mount';

const useBroadState = store => {
  const [state, setGlobal] = useState(store.get());

  useMount(() => {
    return store.subscribe(setGlobal);
  });

  const setState = useMemo(() => state => store.set(state), [store]);
  return [state, setState];
};

export default useBroadState;
