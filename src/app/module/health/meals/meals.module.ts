import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MealFormComponent } from 'src/app/components/health/meals/meal-form/meal-form.component';
import { MealComponent } from 'src/app/components/health/meals/meal/meal.component';
import { MealsComponent } from 'src/app/components/health/meals/meals.component';
import { HealthShareModule } from '../health-share/health-share.module';

const ROUTES: Routes = [
  {
    path: '',
    component: MealsComponent,
  },
  {
    path: 'new',
    component: MealComponent
  },
  {
    path: ':id',
    component: MealComponent
  }
];

@NgModule({
  declarations: [MealsComponent, MealComponent, MealFormComponent],
  imports: [CommonModule, HealthShareModule, RouterModule.forChild(ROUTES), ReactiveFormsModule],
  exports: [],
  providers: [],
})
export class MealsModule {}
