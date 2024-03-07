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
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for comparison

  const todayEvents: Event[] = [];
  const futureEvents: Event[] = [];

  events.forEach((event) => {
    const eventDate = new Date(event.date);
    eventDate.setHours(0, 0, 0, 0);

    if (eventDate.getTime() === today.getTime()) {
      todayEvents.push(event);
    } else if (eventDate.getTime() > today.getTime()) {
      futureEvents.push(event);
    }
  });

  return [todayEvents, futureEvents];
}
