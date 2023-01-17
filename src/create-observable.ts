/**
 * Create a value with the desired type to allow use
 * to observe and update the value
 */

interface IObservable<T> {
  get(): T;
  set(newValue: T): void;
  subscribe(listenerFunc: Listener<T>): void;
}

interface Subscription {
  unsubscribe(): void;
}

type Listener<T> = (data: T) => void;

export class Observable<T> implements IObservable<T> {
  private readonly listeners: Set<Listener<T>> = new Set();
  private value: Readonly<T>;

  constructor(initialData: T) {
    this.value = initialData;
  }

  /**
   * Get the observed value from the observable object
   *
   * @return  {T} The observed value
   */
  get(): T {
    return this.value;
  }

  /**
   * Create a setter for the observed value so we can later
   * subscribe to that value.
   *
   * @param newValue The new value to be set
   */
  set(newValue: T): void {
    if (this.value === newValue) return;
    this.value = newValue;
    this.listeners.forEach((listener: Listener<T>) => listener(this.value));
  }

  /**
   * Subscribe to global listener list and add the listener
   *
   * @param   {Listener<T>}  listenerFunc
   * @return  {<T><Subscription>}
   */
  subscribe(listenerFunc: Listener<T>): Subscription {
    if (!this.listeners.has(listenerFunc)) this.listeners.add(listenerFunc);
    return {
      unsubscribe: () => {
        this.listeners.delete(listenerFunc);
      },
    };
  }
}

/**
 * For backward compatibility with the previous version of the library
 */
const createObservable = <T>(initialData: T): Observable<T> => {
  return new Observable<T>(initialData);
};

export default createObservable;
