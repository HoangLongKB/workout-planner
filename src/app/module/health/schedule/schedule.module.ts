import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleAssignComponent } from 'src/app/components/health/schedule/schedule-assign/schedule-assign.component';
import { ScheduleCalendarComponent } from 'src/app/components/health/schedule/schedule-calendar/schedule-calendar.component';
import { ScheduleControlsComponent } from 'src/app/components/health/schedule/schedule-controls/schedule-controls.component';
import { ScheduleDaysComponent } from 'src/app/components/health/schedule/schedule-days/schedule-days.component';
import { ScheduleSectionComponent } from 'src/app/components/health/schedule/schedule-section/schedule-section.component';
import { ScheduleComponent } from 'src/app/components/health/schedule/schedule.component';

const ROUTES: Routes = [
  {
    path: '',
    component: ScheduleComponent,
  },
];

@NgModule({
  declarations: [
    ScheduleComponent,
    ScheduleCalendarComponent,
    ScheduleDaysComponent,
    ScheduleControlsComponent,
    ScheduleSectionComponent,
    ScheduleAssignComponent
  ],
  imports: [CommonModule, RouterModule.forChild(ROUTES)],
  exports: [],
  providers: [],
})
export class ScheduleModule {}
