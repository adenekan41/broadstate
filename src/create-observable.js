/**
 * createObeservable
 * @function
 * @param {any} target
 * @returns {Object}
 */
const createObservable = target => {
  let listeners = [];
  let value = target;

  // get Observed value
  const get = () => {
    return value;
  };

  /**
   * Set Observable Value
   * @param {any} newValue
   */
  const set = newValue => {
    if (value === newValue) return;
    value = newValue;
    listeners.forEach(l => l(value));
  };

  /**
   * Unsubscribe from global listener
   * @param {Function} listenerFunc
   */
  const unsubscribe = listenerFunc => {
    listeners = listeners.filter(l => l !== listenerFunc);
  };

  /**
   * Subscribe to global listener
   * @param {Function} listenerFunc
   */
  const subscribe = listenerFunc => {
    listeners.push(listenerFunc);
    return () => unsubscribe(listenerFunc);
  };

  return {
    get,
    set,
    subscribe,
  };
};

export default createObservable;
