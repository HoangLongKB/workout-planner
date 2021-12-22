import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, switchMap } from 'rxjs';
import { Meal } from 'src/app/models/meal.model';
import { MealsService } from 'src/app/services/meals/meals.service';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss'],
})
export class MealComponent implements OnInit, OnDestroy {
  subsciption$: Subscription = new Subscription;   
  meal$!: Observable<Meal|any>;   

  constructor(
    private mealsService: MealsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subsciption$ = this.mealsService.meals$().subscribe();
    this.meal$ =  this.activatedRoute.params.pipe(
    switchMap( param => {
      return this.mealsService.getMeal(param['id']);
    })
  );

  }

  ngOnDestroy(): void {
    this.subsciption$.unsubscribe();
  }

  async onCreateMeal(meal: Meal) {
    await this.mealsService.addMeal(meal);
    this.navigateToMeals();
  }
  
  get key() {
    return this.activatedRoute.snapshot.params['id'];
  }

  async onUpdateMeal(meal: Meal) {
    await this.mealsService.updateMeal(this.key, meal);
    this.navigateToMeals();
  }

  async onDeleteMeal(meal: Meal) {
    await this.mealsService.deleteMeal(this.key);
    this.navigateToMeals();
  }

  navigateToMeals() {
    this.router.navigate(['/meals']);
  }
}
