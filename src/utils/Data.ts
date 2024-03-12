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
    return `Created ${hoursPassed} hour${
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
    return `Created ${monthsPassed} month${
      monthsPassed !== 1 ? "s" : ""
    } and ${remainingDays} day${remainingDays !== 1 ? "s" : ""} ago`;
  }
}

export function formatDate(inputDate: string): string {
  const dateParts = inputDate.split(", ")[0].split("/");
  const day = parseInt(dateParts[1]);
  const month = parseInt(dateParts[0]);
  const year = parseInt(dateParts[2]);

  let dayString: string;
  switch (day) {
    case 1:
    case 21:
    case 31:
      dayString = `${day}st`;
      break;
    case 2:
    case 22:
      dayString = `${day}nd`;
      break;
    case 3:
    case 23:
      dayString = `${day}rd`;
      break;
    default:
      dayString = `${day}th`;
  }

  const monthString = new Date(year, month - 1).toLocaleString("en", {
    month: "long",
  });

  const formattedDate = `${dayString} ${monthString} ${year}`;

  return formattedDate;
}

export function formatDateOnly(inputDate: string): string {
  const [datePart] = inputDate.split(", "); // Split to get only the date part
  const [month, day, year] = datePart.split("/"); // Split date part to get month, day, and year

  // Convert day to number
  const dayNumber = parseInt(day);

  // Determine the suffix for the day
  let daySuffix: string;
  if (dayNumber === 1 || dayNumber === 21 || dayNumber === 31) {
    daySuffix = "st";
  } else if (dayNumber === 2 || dayNumber === 22) {
    daySuffix = "nd";
  } else if (dayNumber === 3 || dayNumber === 23) {
    daySuffix = "rd";
  } else {
    daySuffix = "th";
  }

  // Create formatted date string
  const formattedDate = `${day}${daySuffix} ${getMonthName(
    parseInt(month)
  )} ${year}`;
  return formattedDate;
}

// Helper function to get month name
function getMonthName(month: number): string {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[month - 1]; // Month is 0-indexed in JavaScript Date objects
}

export function swap(dateString: string): string {
  const parts = dateString.split("/"); // Split the date string into parts using '/'
  const day = parts[1]; // Extract the day
  const month = parts[0]; // Extract the month
  parts[0] = day; // Swap day with month
  parts[1] = month;

  // Reconstruct the date string with swapped day and month
  return parts.join("/");
}

export function getCurrentDayAndMonth(): string {
  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, "0");
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based, so we add 1
  return `${day}-${month}`;
}
