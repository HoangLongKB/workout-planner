import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-schedule-days',
  templateUrl: './schedule-days.component.html',
  styleUrls: ['./schedule-days.component.scss']
})
export class ScheduleDaysComponent implements OnInit {

  @Input()
  selected!: number;

  @Output()
  select = new EventEmitter<number>();

  days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  constructor() { }

  ngOnInit(): void {
  }

  selectDay(index: number) {
    this.select.emit(index);
  }

}
