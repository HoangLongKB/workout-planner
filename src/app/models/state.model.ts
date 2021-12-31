import { Meal } from "./meal.model";
import { ScheduleItem } from "./schedule-item.model";
import { User } from "./user.model";

export interface State {
  user: User,
  meals: Meal[],
  date: Date,
  schedule: ScheduleItem[],
  selected: any,
  list: any,
  [key: string]: any
}