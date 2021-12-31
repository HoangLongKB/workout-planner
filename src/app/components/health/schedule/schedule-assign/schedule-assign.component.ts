import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Meal } from 'src/app/models/meal.model';
import { Workout } from 'src/app/models/workout.model';

@Component({
  selector: 'app-schedule-assign',
  templateUrl: './schedule-assign.component.html',
  styleUrls: ['./schedule-assign.component.scss']
})
export class ScheduleAssignComponent implements OnInit {

  private selected: any[] = [];

  @Input()
  section: any;

  @Input()
  list!: Meal[] | Workout[] | any;

  @Output()
  update = new EventEmitter<any>();

  @Output()
  cancel = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    this.selected == [...this.section.assigned];
  }

  getRoute(sectionType: string) {
    return [`/${sectionType}/new`];
  }

  exists(name: string) {
    return this.selected.some(item => item.name === name);
  }

  toggleItem(item: any) {
    if (this.exists(item.name)) {
      this.selected = this.selected.filter(i => i.name !== item.name);
    } else {
      this. selected = [...this.selected, item];
    }
  }

  updateAssign() {
    this.update.emit({
      [this.section.type]: this.selected
    })
  }

  cancelAssign() {
    this.cancel.emit();
  }
}
