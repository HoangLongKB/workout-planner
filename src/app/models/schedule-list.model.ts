import { ScheduleItem } from "./schedule-item.model";

export interface ScheduleList {
  morning?: ScheduleItem,
  evening?: ScheduleItem,
  lunch?: ScheduleItem,
  snacks?: ScheduleItem,
  [key: string]: any
}