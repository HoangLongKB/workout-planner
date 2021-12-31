import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { filter, map, Observable, of, tap } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { Workout } from 'src/app/models/workout.model';
import { Store } from 'store';

@Injectable({
  providedIn: 'root'
})
export class WorkoutsService {

  constructor(
    private db: AngularFireDatabase,
    private store: Store,
  ) {}

  workouts$(): Observable<Workout[] | unknown[]> { 
    return this.db.list(`workouts/${this.uid}`).snapshotChanges().pipe(
    map(next => {
      return next.map(item => {
        const data = item.payload.val() as Object;
        const $key = item.payload.key;
        return {...data, $key};
      })
    }),
    tap(workouts => {
      this.store.set('workouts', workouts);
    })
  )};

  get uid() {
    return this.store.getRaw<User>('user').uid;
  }

  addWorkout(workout: Workout) {
    return this.db.list(`workouts/${this.uid}`).push(workout);
  }

  updateWorkout(key: string, workout: Workout) {
    return this.db.object(`workouts/${this.uid}/${key}`).update(workout);
  }

  getWorkout(key: string) {
    if (!key) {
      return of({});
    }
    return this.store.get<Workout[]>('workouts').pipe(
      filter(Boolean),
      map( (workouts: Workout[]) => {
        return workouts.find(workout => workout.$key === key);
      })
    );
  }

  deleteWorkout(key: string) {
    return this.db.list(`workouts/${this.uid}`).remove(key);
  }
}
