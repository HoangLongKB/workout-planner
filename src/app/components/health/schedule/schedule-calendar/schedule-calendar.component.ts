import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ScheduleItem } from 'src/app/models/schedule-item.model';
import { ScheduleList } from 'src/app/models/schedule-list.model';

@Component({
  selector: 'app-schedule-calendar',
  templateUrl: './schedule-calendar.component.html',
  styleUrls: ['./schedule-calendar.component.scss']
})
export class ScheduleCalendarComponent implements OnInit, OnChanges {

  selectedDate!: Date;
  selectedWeek!: Date;
  selectedDayIndex!: number;

  sections = [
    { key: 'morning', name: 'Morning'},
    { key: 'lunch', name: 'Lunch'},
    { key: 'evening', name: 'Evening'},
    { key: 'snacks', name: 'Snacks and Drinks'},
  ];

  @Input()
  set date(date: (Date | null)) {
    this.selectedDate = new Date(date!.getTime());
  }

  @Input()
  items!: ScheduleList | null;

  @Output()
  change: EventEmitter<Date> = new EventEmitter();

  @Output()
  select = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.selectedWeek = this.getStartOfWeek(new Date(this.selectedDate));
    this.selectedDayIndex = this.getDayIndex(this.selectedDate);
  }

  getSection(name: string): ScheduleItem {
    return this.items && this.items[name] || {};
  }

  getDayIndex(date: Date) {
    let index = date?.getDay()! - 1;
    if (index < 0) {
      index = 6;
    }
    return index;
  }

  selectDay(index: number) {
    const selectedDay = new Date(this.selectedWeek);
    selectedDay.setDate(selectedDay.getDate() + index);
    this.change.emit(selectedDay);
  }

  changeDate(weekOffset: number) {
    console.log('offset', weekOffset)
    const startOfWeek = this.getStartOfWeek(new Date());
    const startDate = new Date(
      startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate()
    )
    startDate.setDate(startDate.getDate() + (weekOffset * 7));
    this.change.emit(startDate);
  }

  // return Monday of given week
  private getStartOfWeek(date: Date) {
    // return 0 - 6 ( Sunday - Saturday)
    const currentDay = date.getDay();
    // calc day of current week
    const dayOfMonday = date.getDate() - currentDay + (currentDay === 0 ? -6 : 1);
    return new Date(date.setDate(dayOfMonday));
  }

  selectSection({type, assigned, data}: any, section: string) {
    const day = this.selectedDate;
    this.select.emit({
      type,
      assigned,
      section,
      day,
      data
    })
  }
}
