import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Relates to mixin.
 */
export interface State<S> {
  _dispatch$: BehaviorSubject<S>;
  _initialState: S;
  getStateProp<K extends keyof S>(prop: K): Observable<S[K]>;
  resetState(): void;
  state: S;
  state$: Observable<S>;
  updateState(newState: S, callback?: (newState: S) => void): void;
  updateStateProperty<K extends keyof S>(
    propertyKey: K,
    propertyValue: S[K],
    callback?: (state: S) => void,
  ): void;
}
