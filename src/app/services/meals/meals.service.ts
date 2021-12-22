import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { filter, map, Observable, of, tap } from 'rxjs';
import { Meal } from 'src/app/models/meal.model';
import { User } from 'src/app/models/user.model';
import { Store } from 'store';

@Injectable({
  providedIn: 'root'
})
export class MealsService {

  constructor(
    private db: AngularFireDatabase,
    private store: Store,
  ) {}

  meals$(): Observable<Meal[] | unknown[]> { 
    return this.db.list(`meals/${this.uid}`).snapshotChanges().pipe(
    map(next => {
      return next.map(item => {
        const data = item.payload.val() as Object;
        const $key = item.payload.key;
        return {...data, $key};
      })
    }),
    tap(meals => {
      this.store.set('meals', meals);
    })
  )};

  get uid() {
    return this.store.getRaw<User>('user').uid;
  }

  addMeal(meal: Meal) {
    return this.db.list(`meals/${this.uid}`).push(meal);
  }

  updateMeal(key: string, meal: Meal) {
    return this.db.object(`meals/${this.uid}/${key}`).update(meal);
  }

  getMeal(key: string) {
    if (!key) {
      return of({});
    }
    return this.store.get<Meal[]>('meals').pipe(
      filter(Boolean),
      map( (meals: Meal[]) => {
        return meals.find(meal => meal.$key === key);
      })
    );
  }

  deleteMeal(key: string) {
    return this.db.list(`meals/${this.uid}`).remove(key);
  }
}
