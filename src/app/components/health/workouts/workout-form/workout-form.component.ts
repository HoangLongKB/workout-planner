import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Workout } from 'src/app/models/workout.model';

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.scss']
})
export class WorkoutFormComponent implements OnInit, OnChanges {

  @Input()
  workout: Workout | undefined;

  @Output()
  create: EventEmitter<Workout> = new EventEmitter<Workout>();

  @Output()
  update: EventEmitter<Workout> = new EventEmitter<Workout>();

  @Output()
  delete: EventEmitter<Workout> = new EventEmitter<Workout>();

  exists: boolean = false;

  deleteToggle: boolean = false;

  constructor( private fb: FormBuilder, private router: Router ) { }

  form = this.fb.group({
    name: ['', Validators.required],
    type: 'strength',
    strength: this.fb.group({
      reps: 0,
      sets: 0,
      weight: 0
    }),
    endurance: this.fb.group({
      distance: 0,
      duration: 0
    })
  })

  ngOnChanges(changes: SimpleChanges): void {
      if (this.workout && this.workout.name) {
        this.exists = true;
        this.form.patchValue(this.workout);
      }
  }

  ngOnInit(): void {
  }

  toggleDelete() {
    this.deleteToggle = !this.deleteToggle;
  }

  onCreateWorkout() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }

  onUpdateWorkout() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.update.emit(this.form.value);
    }
  }

  onDeleteWorkout() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.delete.emit(this.form.value);
    }
  }

  get isNameRequired() {
    return this.form.get('name')?.hasError('required') && this.form.get('name')?.touched;
  }

  navigateToWorkouts() {
    this.router.navigate(['/workouts']);
  }

  get type() {
    return this.form.get('type')?.value;
  }

  get placeholder() {
    return `e.g. ${this.type === 'strength' ? 'Benchpress' : 'Treadmill'}`
  }


}
