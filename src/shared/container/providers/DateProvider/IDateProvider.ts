interface IDateProvider {
  now(): Date;
  toUtc(date: Date): string;
  hourDiff(start_date: Date, end_date: Date): number;
  addHours(date: Date, hours?: number): Date;
  daysDiff(start_date: Date, end_date: Date): number;
  addDays(date: Date, hours?: number): Date;
}

export { IDateProvider };
