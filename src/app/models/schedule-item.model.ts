import { Meal } from "./meal.model";
import { Workout } from "./workout.model";

export interface ScheduleItem {
  meals: Meal[],
  workouts: Workout[],
  section: string,
  timestamp: number,
  key$?: string
}