/**
 * Create a value with the desired type to allow use
 * to observe and update the value
 */

export interface IObservable<T> {
  get: () => T;
  set: (data: T) => void;
  subscribe: (callback: (data: T) => void) => void;
}

const createObservable = <T extends unknown>(
  initialData: T
): IObservable<T> => {
  let listeners: Array<T> = [];
  let value = initialData;

  // get Observed value
  const get = (): T => value;

  /**
   * Create a setter for the observed value so we can later
   * on subcribe to that value
   *
   */
  const set = (newValue: T) => {
    /**
     * throw and early return if former value is equals to the new value
     */
    if (value === newValue) return;

    value = newValue;
    /**
     * At this point we have a subcriber to the value
     */
    listeners.forEach((listener: any) => listener(value));
  };

  /**
   * Unsubscribe from global listener list and remove the listener
   */
  const unsubscribe = (listenerFunc: (data: T) => void): void => {
    listeners = listeners.filter(listener => listener !== listenerFunc);
    return;
  };

  /**
   * Subscribe to global listener list and add the listener
   */
  const subscribe = (listenerFunc: (callback: T) => void): void | unknown => {
    listeners.push(listenerFunc as T);
    return () => unsubscribe(listenerFunc);
  };

  return {
    get,
    set,
    subscribe,
  };
};

export default createObservable;
