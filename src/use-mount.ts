/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */
import { useEffect } from 'react';

/**
 * Gives you the ability to run a function only when users
 * loads into the platform similar to a componentDidMount
 */
const useMount = (effect: () => void) => useEffect(effect, []);

export default useMount;
