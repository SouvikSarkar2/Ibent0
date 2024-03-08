interface Event {
  attendees: number;
  color: string;
  date: string;
  duration: number;
  hr: number;
  id: string;
  mn: number;
  title: string;
}

export function separateEvents(events: Event[]): [Event[], Event[]] {
  const now = new Date(); // Current date and time

  // Filter past events and sort events by date
  const filteredEvents = events
    .filter((event) => {
      const eventDate = new Date(event.date);
      if (
        eventDate.getDate() === now.getDate() &&
        eventDate.getMonth() === now.getMonth()
      ) {
        // If the event is on the same day as today
        const eventStart =
          eventDate.getTime() + (event.hr * 60 + event.mn) * 60000; // Event start time in milliseconds
        const eventEnd = eventStart + event.duration * 60000; // Event end time in milliseconds
        const nowTime = now.getTime(); // Current time in milliseconds
        return eventEnd > nowTime; // Only include events that haven't ended yet
      }
      return eventDate.getTime() >= now.getTime(); // Include events on future dates
    })
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    });

  // Split filtered events into today and future events
  const todayEvents: Event[] = [];
  const futureEvents: Event[] = [];

  filteredEvents.forEach((event) => {
    const eventDate = new Date(event.date);
    const eventDay = eventDate.getDate();
    const eventMonth = eventDate.getMonth();
    const nowDay = now.getDate();
    const nowMonth = now.getMonth();

    if (eventDay === nowDay && eventMonth === nowMonth) {
      todayEvents.push(event);
    } else {
      futureEvents.push(event);
    }
  });

  return [todayEvents, futureEvents];
}
