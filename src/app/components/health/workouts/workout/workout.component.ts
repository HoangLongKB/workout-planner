import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, switchMap } from 'rxjs';
import { Workout } from 'src/app/models/workout.model';
import { WorkoutsService } from 'src/app/services/workouts/workouts.service';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent implements OnInit {
  subsciption$: Subscription = new Subscription;
  workout$!: Observable<Workout | any>;

  constructor(
    private workoutsService: WorkoutsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subsciption$ = this.workoutsService.workouts$().subscribe();
    this.workout$ = this.activatedRoute.params.pipe(
      switchMap(param => {
        return this.workoutsService.getWorkout(param['id']);
      })
    );

  }

  ngOnDestroy(): void {
    this.subsciption$.unsubscribe();
  }

  async onCreateWorkout(workout: Workout) {
    await this.workoutsService.addWorkout(workout);
    this.navigateToWorkouts();
  }

  get key() {
    return this.activatedRoute.snapshot.params['id'];
  }

  async onUpdateWorkout(workout: Workout) {
    await this.workoutsService.updateWorkout(this.key, workout);
    this.navigateToWorkouts();
  }

  async onDeleteWorkout(workout: Workout) {
    await this.workoutsService.deleteWorkout(this.key);
    this.navigateToWorkouts();
  }

  navigateToWorkouts() {
    this.router.navigate(['/workouts']);
  }
}
