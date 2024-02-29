export function currentMonthNumber(): number {
  const now: Date = new Date();
  return now.getMonth() + 1;
}

export function currentYear(): number {
  const now: Date = new Date();
  return now.getFullYear();
}

export function getMonthAbbreviation(monthNumber: number): string {
  const months: string[] = [
    "",
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  return months[monthNumber];
}

export function days(): string[] {
  const days: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days;
}

export function getDatesInMonth(month: number, year: number): number[] {
  const numDays = new Date(year, month, 0).getDate();
  return Array.from({ length: numDays }, (_, i) => i + 1);
}

export function getStartingDayOfMonth(month: number, year: number): number[] {
  const startingDay: number = new Date(year, month - 1, 1).getDay();
  const startingDayIndex: number = (startingDay + 6) % 7;
  return Array.from(
    { length: startingDayIndex },
    (_, index) => (index + 6) % 7
  );
}
