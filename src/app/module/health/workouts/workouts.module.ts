import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { WorkoutsComponent } from 'src/app/components/health/workouts/workouts.component';

const ROUTES: Routes = [
  {
    path: '',
    component: WorkoutsComponent,
  },
];

@NgModule({
  declarations: [WorkoutsComponent],
  imports: [CommonModule, RouterModule.forChild(ROUTES), ReactiveFormsModule],
  exports: [],
  providers: [],
})
export class WorkoutsModule {}
