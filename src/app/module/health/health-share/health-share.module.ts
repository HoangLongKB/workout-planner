import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { MealsService } from 'src/app/services/meals/meals.service';
import { ListItemsComponent } from 'src/app/components/health/list-items/list-items.component';
import { WorkoutsService } from 'src/app/services/workouts/workouts.service';
import { WorkoutPipe } from 'src/app/share/pipes/workout.pipe';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';



@NgModule({
  declarations: [ ListItemsComponent, WorkoutPipe ],
  imports: [
    CommonModule,
    RouterModule,
    AngularFireDatabaseModule
  ],
  exports: [ ListItemsComponent, WorkoutPipe ]
})
export class HealthShareModule {
  static forRoot(): ModuleWithProviders<HealthShareModule> {
    return {
      ngModule: HealthShareModule,
      providers: [
        MealsService,
        WorkoutsService,
        ScheduleService
      ]
    };
  }
}
