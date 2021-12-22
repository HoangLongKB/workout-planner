import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleComponent } from 'src/app/components/health/schedule/schedule.component';

const ROUTES: Routes = [
  {
    path: '',
    component: ScheduleComponent,
  },
];

@NgModule({
  declarations: [ScheduleComponent],
  imports: [CommonModule, RouterModule.forChild(ROUTES)],
  exports: [],
  providers: [],
})
export class ScheduleModule {}
