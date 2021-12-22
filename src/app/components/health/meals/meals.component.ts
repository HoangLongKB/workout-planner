import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Meal } from 'src/app/models/meal.model';
import { MealsService } from 'src/app/services/meals/meals.service';
import { Store } from 'store';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss']
})
export class MealsComponent implements OnInit, OnDestroy {

  meals$: Observable<Meal[]> | undefined;
  subscription$: Subscription = new Subscription;

  constructor(
    private mealsService: MealsService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.meals$ = this.store.get('meals');
    this.subscription$ = this.mealsService.meals$().subscribe();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  onDeleteMeal(meal: any) {
    this.mealsService.deleteMeal(meal.$key);
  }

}
