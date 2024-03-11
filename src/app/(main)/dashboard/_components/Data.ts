export function getDonutData(events: any): number[] {
  let workCount = 0;
  let personalCount = 0;
  let socialCount = 0;

  for (const event of events) {
    switch (event.type) {
      case "Work":
        workCount++;
        break;
      case "Personal":
        personalCount++;
        break;
      case "Social":
        socialCount++;
        break;
      default:
        break;
    }
  }

  // Return the counts as an array
  return [workCount, personalCount, socialCount];
}

export const getBarData = (events: any): number[] => {
  // Initialize an array to hold the count of events for each month
  const monthCounts: number[] = new Array(12).fill(0);

  // Loop through the events array
  events.forEach((event: any) => {
    // Extract the month from the event date
    const date = new Date(event.date);
    const month = date.getMonth();

    // Increment the count for the corresponding month
    monthCounts[month]++;
  });

  return monthCounts;
};

export const getLineData = (events: any): number[][] => {
  // Initialize a 2D array to hold the count of events for each type (work, personal, social) and each month
  const lineData: number[][] = [[], [], []];

  // Initialize counts for each type for each month
  const counts: { [key: string]: number[] } = {
    Work: new Array(12).fill(0),
    Personal: new Array(12).fill(0),
    Social: new Array(12).fill(0),
  };

  // Loop through the events array
  events.forEach((event: any) => {
    // Extract the month from the event date
    const date: any = new Date(event.date);
    const month = date.getMonth();

    // Increment the count for the corresponding type and month
    counts[event.type][month]++;
  });

  // Populate lineData array with counts for each type
  Object.keys(counts).forEach((type, index) => {
    lineData[index] = counts[type];
  });

  return lineData;
};

export const givePercentage = (events: any): number => {
  const now = new Date(); // Current date and time

  // Filter events that have passed
  const completedEvents = events.filter((event: any) => {
    const eventDate: any = new Date(event.date);
    const eventEndTime = new Date(
      eventDate.getTime() + (event.hr * 60 + event.mn + event.duration) * 60000
    );
    return eventEndTime <= now;
  });

  // Calculate percentage of completed events
  const percentage = Math.floor((completedEvents.length / events.length) * 100);
  return percentage;
};
