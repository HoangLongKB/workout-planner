import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { WorkoutFormComponent } from 'src/app/components/health/workouts/workout-form/workout-form.component';
import { WorkoutTypeComponent } from 'src/app/components/health/workouts/workout-form/workout-type/workout-type.component';
import { WorkoutComponent } from 'src/app/components/health/workouts/workout/workout.component';
import { WorkoutsComponent } from 'src/app/components/health/workouts/workouts.component';
import { HealthShareModule } from '../health-share/health-share.module';

const ROUTES: Routes = [
  {
    path: '',
    component: WorkoutsComponent,
  },
  {
    path: 'new',
    component: WorkoutComponent
  },
  {
    path: ':id',
    component: WorkoutComponent
  }
];

@NgModule({
  declarations: [WorkoutsComponent, WorkoutComponent, WorkoutFormComponent, WorkoutTypeComponent],
  imports: [CommonModule, RouterModule.forChild(ROUTES), ReactiveFormsModule, HealthShareModule],
  exports: [],
  providers: [],
})
export class WorkoutsModule {}
