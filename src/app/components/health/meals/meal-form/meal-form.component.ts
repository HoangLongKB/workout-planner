import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Meal } from 'src/app/models/meal.model';

@Component({
  selector: 'app-meal-form',
  templateUrl: './meal-form.component.html',
  styleUrls: ['./meal-form.component.scss']
})
export class MealFormComponent implements OnInit, OnChanges {

  @Input()
  meal: Meal | undefined;

  @Output()
  create: EventEmitter<Meal> = new EventEmitter<Meal>();

  @Output()
  update: EventEmitter<Meal> = new EventEmitter<Meal>();

  @Output()
  delete: EventEmitter<Meal> = new EventEmitter<Meal>();

  exists: boolean = false;

  deleteToggle: boolean = false;

  constructor( private fb: FormBuilder, private router: Router ) { }

  form = this.fb.group({
    name: ['', Validators.required],
    ingredients: this.fb.array([this.fb.control('', Validators.required)])
  })

  ngOnChanges(changes: SimpleChanges): void {
      if (this.meal && this.meal.name) {
        this.exists = true;
        this.ingredients.clear();
        this.form.patchValue(this.meal);
        if (this.meal.ingredients) {
          for (const ingredient of this.meal.ingredients) {
            this.ingredients.push(new FormControl(ingredient, Validators.required));
          }
        }
      }
  }

  ngOnInit(): void {
  }

  toggleDelete() {
    this.deleteToggle = !this.deleteToggle;
  }

  onCreateMeal() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }

  onUpdateMeal() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.update.emit(this.form.value);
    }
  }

  onDeleteMeal() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.delete.emit(this.form.value);
    }
  }

  get ingredients() {
    return this.form.get('ingredients') as FormArray;
  }

  addIngredient() {
    this.ingredients.push(new FormControl('', Validators.required));
  }

  get isNameRequired() {
    return this.form.get('name')?.hasError('required') && this.form.get('name')?.touched;
  }

  isFoodNameRequired(index: number) {
    const control = this.ingredients.at(index);
    return control.hasError('required') && control.touched;
    
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  navigateToMeals() {
    this.router.navigate(['/meals']);
  }


}
