import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ScheduleItem } from 'src/app/models/schedule-item.model';

@Component({
  selector: 'app-schedule-section',
  templateUrl: './schedule-section.component.html',
  styleUrls: ['./schedule-section.component.scss']
})
export class ScheduleSectionComponent implements OnInit {

  @Input()
  name!: string;

  @Input()
  section!: ScheduleItem;

  @Output()
  select = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(type: string, assigned: any[] = []) {
    const data =this.section;
    this.select.emit({
      type,
      assigned,
      data
    })
  }

}
