import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'workout'
})
export class WorkoutPipe implements PipeTransform{
  transform(value: any, ...args: any[]) {
    let result: string[] = [];
    if (value.type === 'strength') {
      const reps = `Reps: ${value.strength.reps}`;
      const sets = `Sets: ${value.strength.sets}`;
      const weight = `Weight: ${value.strength.weight}`;
      result = [reps, sets, weight];
    }
    if (value.type === 'endurance') {
      const distance = `Distance: ${value.endurance.distance} Km`;
      const duration = `Duration: ${value.endurance.duration} Minute`;
      result = [distance, duration];
    }
    return result;
  }
}