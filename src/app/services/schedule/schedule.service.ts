import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { User } from 'firebase/auth';
import {
  BehaviorSubject,
  map,
  Observable,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { ScheduleList } from 'src/app/models/schedule-list.model';
import { Store } from 'store';

@Injectable({ providedIn: 'root' })
export class ScheduleService {
  constructor(private store: Store, private db: AngularFireDatabase) {}

  private date = new BehaviorSubject<Date>(new Date());
  private section$ = new Subject();
  selected$ = this.section$.pipe(
    tap((next: any) => {
      this.store.set('selected', next);
    })
  );
  list$ = this.section$.pipe(
    map((value: any) => {
      return this.store.value[value.type];
    }),
    tap((next: any) => {
      this.store.set('list', next);
    })
  );
  public schedule$: Observable<any> = this.date.pipe(
    tap((date) => {
      this.store.set('date', date);
    }),
    map((date: any) => {
      const startAt = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      ).getTime();
      const endAt =
        new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + 1
        ).getTime() - 1;
      return { startAt, endAt };
    }),
    switchMap(({ startAt, endAt }: any) => {
      return this.getSchedule(startAt, endAt).valueChanges();
    }),
    map((data: any) => {
      const mapped: ScheduleList = {};

      for (const prop of data) {
        if (!mapped[prop.section]) {
          mapped[prop.section] = prop;
        }
      }

      return mapped;
    }),
    tap((next: any) => {
      this.store.set('schedule', next);
    })
  );

  get uid() {
    return this.store.getRaw<User>('user').uid;
  }

  getSchedule(startAt: number, endAt: number) {
    return this.db.list(`/schedule/${this.uid}`, (ref) => {
      return ref.orderByChild('timestamp').startAt(startAt).endAt(endAt);
    });
  }

  updateDate(date: Date) {
    this.date.next(date);
  }

  selectSection(event: any) {
    this.section$.next(event);
  }
}
