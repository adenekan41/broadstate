/**
 * createObeservable
 * @function
 * @param {any} initialData
 * @returns {Object}
 */
const createObservable = initialData => {
  let listeners = [];
  let value = initialData;

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
    listeners.forEach(listener => listener(value));
  };

  /**
   * Unsubscribe from global listener
   * @param {Function} listenerFunc
   */
  const unsubscribe = listenerFunc => {
    listeners = listeners.filter(listener => listener !== listenerFunc);
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
