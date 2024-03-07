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

export function calculateTimeElapsed(createdAtString: string): string {
  const createdAt: Date = new Date(createdAtString);
  const currentTime: Date = new Date();

  const millisecondsPassed: number =
    currentTime.getTime() - createdAt.getTime();
  const minutesPassed: number = Math.floor(millisecondsPassed / (1000 * 60)); // Convert milliseconds to minutes

  if (minutesPassed < 60) {
    return `Created ${minutesPassed} minute${
      minutesPassed !== 1 ? "s" : ""
    } ago`;
  } else if (minutesPassed < 1440) {
    // 1440 minutes = 1 day
    const hoursPassed: number = Math.floor(minutesPassed / 60);
    const remainingMinutes: number = minutesPassed % 60;
    return `Created${hoursPassed} hour${
      hoursPassed !== 1 ? "s" : ""
    } and ${remainingMinutes} minute${remainingMinutes !== 1 ? "s" : ""} ago`;
  } else if (minutesPassed < 43200) {
    // 43200 minutes = 30 days (approximately 1 month)
    const daysPassed: number = Math.floor(minutesPassed / 1440);
    const remainingHours: number = Math.floor((minutesPassed % 1440) / 60);
    return `Created ${daysPassed} day${
      daysPassed !== 1 ? "s" : ""
    } and ${remainingHours} hour${remainingHours !== 1 ? "s" : ""} ago`;
  } else {
    const monthsPassed: number = Math.floor(minutesPassed / 43200); // Approximately 30 days per month
    const remainingDays: number = Math.floor((minutesPassed % 43200) / 1440);
    return `Created${monthsPassed} month${
      monthsPassed !== 1 ? "s" : ""
    } and ${remainingDays} day${remainingDays !== 1 ? "s" : ""} ago`;
  }
}

// Example usage:
const createdAtString: string = "2024-03-06T12:56:05.966Z"; // Assume the event was created on March 6th, 2024
const timeElapsed: string = calculateTimeElapsed(createdAtString);
console.log(`Time elapsed since creation: ${timeElapsed}`);
