interface Event {
  __typename: string;
  title: string;
  id: string;
  date: string;
  type: string;
  hr: number;
  mn: number;
  duration: number;
}

export function filterEventsByMonthAndYear(
  events: Event[],
  month: number,
  year: number
): Event[] {
  return events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getMonth() + 1 === month && eventDate.getFullYear() === year
    );
  });
}

export function filterEventsForDay(events: Event[], day: number): Event[] {
  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getDate() === day;
  });

  // Sort filtered events by start time (hr and mn)
  filteredEvents.sort((a, b) => {
    const startTimeA = a.hr * 60 + a.mn;
    const startTimeB = b.hr * 60 + b.mn;
    return startTimeA - startTimeB;
  });

  return filteredEvents;
}

export function formatEventTime(
  startHr: number,
  startMn: number,
  duration: number
): string {
  // Calculate end time
  const endMn = (startMn + duration) % 60;
  const endHr = startHr + Math.floor((startMn + duration) / 60);

  // Format start and end times
  const startTime = `${startHr.toString().padStart(2, "0")}:${startMn
    .toString()
    .padStart(2, "0")}`;
  const endTime = `${endHr.toString().padStart(2, "0")}:${endMn
    .toString()
    .padStart(2, "0")}`;

  return `${startTime} - ${endTime}`;
}
