import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";

dayjs.extend(weekOfYear);

export default function getWeekLabel(timestamp) {
  // Convert Unix timestamp to milliseconds
  const eventDate = dayjs(timestamp * 1000);
  const currentWeek = dayjs().week();
  const eventWeek = eventDate.week();

  if (eventWeek === currentWeek) {
    return "This week";
  } else if (eventWeek === currentWeek + 1) {
    return "Next week";
  } else {
    return `Week ${eventWeek}`;
  }
}
