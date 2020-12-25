/**
 * Create a value with the desired type to allow use
 * to observe and update the value
 *
 * @template T
 * @param {(any<T> | unknown<T>)} initialData - Create a value with any data type
 * @returns {Object} get, set, subscribe
 */
const createObservable = initialData => {
  let listeners = [];
  let value = initialData;

  // get Observed value
  const get = () => {
    return value;
  };

  /**
   * Create a setter for the observed value so we can later
   * on subcribe to that value
   *
   * @param {any<T>} newValue  - Fresh new value to be updated
   * @returns {void}
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
   *
   * @param {Function} listenerFunc
   * @returns {Function} returns the unsubscribed value
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
