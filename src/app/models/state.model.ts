import { Meal } from "./meal.model";
import { User } from "./user.model";

export interface State {
  user: User,
  meals: Meal[],
  [key: string]: any
}