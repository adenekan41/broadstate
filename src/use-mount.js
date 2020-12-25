/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */
import { useEffect } from 'react';

/**
 * Gives you the ability to run a function only when users
 * loads into the platform similar to a componentDidMount
 *
 * @param {Function} cb
 * @returns {void}
 */
const useMount = cb =>
  useEffect(() => {
    cb();
    // eslint-disable-next-line
  }, []);

export default useMount;
