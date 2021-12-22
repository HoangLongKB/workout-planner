import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/guards/auth-guard/auth-guard.guard";
import { HealthShareModule } from "./health-share/health-share.module";

const ROUTES: Routes = [
  {
    path: 'meals',
    canActivate: [AuthGuard],
    loadChildren: () => import('./meals/meals.module').then(m => m.MealsModule)
  },
  {
    path: 'workouts',
    canActivate: [AuthGuard],
    loadChildren: () => import('./workouts/workouts.module').then(m => m.WorkoutsModule)
  },
  {
    path: 'schedule',
    canActivate: [AuthGuard],
    loadChildren: () => import('./schedule/schedule.module').then(m => m.ScheduleModule)
  }
]

@NgModule(
  {
    imports: [
      CommonModule,
      RouterModule.forChild(ROUTES),
      HealthShareModule.forRoot()
    ],
    providers: [
      AuthGuard
    ]
  }
)
export class HealthModule {}