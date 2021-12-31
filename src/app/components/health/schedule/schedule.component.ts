import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Meal } from 'src/app/models/meal.model';
import { ScheduleItem } from 'src/app/models/schedule-item.model';
import { Workout } from 'src/app/models/workout.model';
import { MealsService } from 'src/app/services/meals/meals.service';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';
import { WorkoutsService } from 'src/app/services/workouts/workouts.service';
import { Store } from 'store';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store,
    private scheduleService: ScheduleService,
    private mealsService: MealsService,
    private workoutsService: WorkoutsService
  ) {}

  private subscriptions: Subscription[] = [];
  date$!: Observable<Date>;
  schedule$!: Observable<ScheduleItem[]>;
  selected$!: Observable<any>;
  list$!: Observable<Meal[] | Workout[]>;
  open = false;

  ngOnInit(): void {
    this.date$ = this.store.get('date');
    this.schedule$ = this.store.get('schedule');
    this.selected$ = this.store.get('selected');
    this.list$ = this.store.get('list');
    this.subscriptions = [
      this.scheduleService.schedule$.subscribe(),
      this.scheduleService.selected$.subscribe(),
      this.mealsService.meals$().subscribe(),
      this.workoutsService.workouts$().subscribe(),
      this.scheduleService.list$.subscribe()
    ];
  }
  onDateChange(date: Date) {
    this.scheduleService.updateDate(date);
  }

  changeSection(event: any) {
    console.log(event);
    this.open = true;
    this.scheduleService.selectSection(event);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
