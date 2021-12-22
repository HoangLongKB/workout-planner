import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss']
})
export class ListItemsComponent implements OnInit {
  
  @Input()
  item: any;

  @Output()
  delete: EventEmitter<any> = new EventEmitter<any>();

  deleteToggle: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  getRoute(item: any) {
    return [`/meals/${item.$key}`]
  }

  toggleDelete() {
    this.deleteToggle = !this.deleteToggle;
  }

  deleteItem() {
    this.delete.emit(this.item);
  }

}
