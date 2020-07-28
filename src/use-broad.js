/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */
import { useState, useEffect, useMemo } from 'react';

const useBroadState = store => {
  const [state, setGlobal] = useState(store.get());

  useEffect(() => {
    return store.subscribe(setGlobal);
    // eslint-disable-next-line
  }, []);

  const setState = useMemo(() => state => store.set(state), [store]);
  return [state, setState];
};

export default useBroadState;
