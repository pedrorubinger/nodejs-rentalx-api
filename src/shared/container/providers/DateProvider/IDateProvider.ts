interface IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number
  compareInDays(start_date: Date, end_date: Date): number
  converToUTC(date: Date): string
  dateNow(): Date
  addDays(days: number): Date
  addHours(hours: number): Date
}

export { IDateProvider }
