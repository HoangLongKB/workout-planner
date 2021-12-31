import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, Observable, pluck } from 'rxjs';
import { State } from './app/models/state.model';

const state: State = {
  user: undefined!,
  meals: undefined!,
  date: undefined!,
  schedule: undefined!,
  selected: undefined!,
  list: undefined!,
  workouts: undefined!
};

@Injectable()
export class Store {
  private subject = new BehaviorSubject<State>(state);
  private store$ = this.subject.asObservable().pipe(distinctUntilChanged());

  get value() {
    return this.subject.value;
  }

  get<T>(prop: string): Observable<T> {
    return this.store$.pipe(pluck(prop));
  }

  getRaw<T>(prop: string): T {
    return this.value[prop];
  }

  set(prop: string, state: any) {
    this.subject.next({
      ...this.value,
      [prop]: state,
    });
  }
}
