import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function formatEventDate(timestamp, timezone) {
  // Convert Unix timestamp to milliseconds
  const unixTimestampInMilliseconds = timestamp * 1000;

  // Format the timestamp to the desired format with timezone
  const time = dayjs(unixTimestampInMilliseconds).tz(timezone).format("h:mm A");

  const date = dayjs(unixTimestampInMilliseconds)
    .tz(timezone)
    .format("ddd, MMM D");

  // Combine time and date with a newline character
  return `${time}\n${date}`;
}
