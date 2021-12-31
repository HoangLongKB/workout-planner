import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Workout } from 'src/app/models/workout.model';
import { WorkoutsService } from 'src/app/services/workouts/workouts.service';
import { Store } from 'store';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.scss']
})
export class WorkoutsComponent implements OnInit {


  workouts$: Observable<Workout[]> | undefined;
  subscription$: Subscription = new Subscription;

  constructor(
    private workoutsService: WorkoutsService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.workouts$ = this.store.get('workouts');
    this.subscription$ = this.workoutsService.workouts$().subscribe();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  onDeleteWorkout(workout: any) {
    this.workoutsService.deleteWorkout(workout.$key);
  }

}
