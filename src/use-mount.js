/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */
import { useEffect } from 'react';

const useMount = cb =>
  useEffect(() => {
    cb();
    // eslint-disable-next-line
  }, []);

export default useMount;
