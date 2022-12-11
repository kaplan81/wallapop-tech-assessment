import { BehaviorSubject, map, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Constructor, ConstructorBase } from '../models/constructor.model';
import { State } from '../models/state.model';

export const stateMixin = <T extends ConstructorBase, S>(
  Base: T,
  initialState: S,
): Constructor<State<S>> & T =>
  class extends Base {
    _dispatch$: BehaviorSubject<S>;
    _initialState: S = initialState;
    state: S = this._initialState;
    state$: Observable<S>;

    constructor(...args: any[]) {
      super(...args);
      this._dispatch$ = new BehaviorSubject<S>(this.state);
      this.state$ = this._dispatch$.asObservable();
    }

    getStateProp<K extends keyof S>(prop: K): Observable<S[K]> {
      return this.state$.pipe(map((state: S) => state[prop]));
    }

    resetState(): void {
      this.updateState(this._initialState);
    }

    updateState(newState: S, callback?: (newState: S) => void): void {
      this._dispatch$.next((this.state = newState));
      if (callback !== undefined) {
        // this.state is already the new state.
        callback(this.state);
      }
    }

    updateStateProperty<K extends keyof S>(
      propertyKey: K,
      propertyValue: S[K],
      callback?: (state: S) => void,
    ): void {
      this.state$.pipe(take(1)).subscribe((state: S) => {
        this.updateState({
          ...(state as Record<K, S[K]>),
          [propertyKey]: propertyValue,
        } as unknown as S);
        if (callback !== undefined) {
          // this.state is already the new state.
          callback(this.state);
        }
      });
    }
  };

export const StateMixin = <S>(initialState: S): Constructor<State<S>> & ConstructorBase =>
  stateMixin<ConstructorBase, S>(class _ {}, initialState);
