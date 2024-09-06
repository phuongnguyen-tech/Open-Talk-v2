import React, { useState, useCallback, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
} from "@mui/material";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"; // Import dayjs plugin for handling UTC
import timezone from "dayjs/plugin/timezone"; // Import dayjs plugin for handling timezones

dayjs.extend(utc);
dayjs.extend(timezone);

const EventDateTimePicker = ({ field }) => {
  const [selectedDate, setSelectedDate] = useState(null); // Initially, no date is selected
  const [dateString, setDateString] = useState("");

  // Helper function to get the next 4 Wednesdays
  const getNextWednesdays = useCallback(() => {
    let wednesdays = [];
    let currentDate = dayjs().day(3); // Day of the week: 3 represents Wednesday

    // Move to next Wednesday if today is past Wednesday
    if (currentDate.isBefore(dayjs(), "day")) {
      currentDate = currentDate.add(1, "week");
    }

    for (let i = 0; i < 4; i++) {
      wednesdays.push(currentDate);
      currentDate = currentDate.add(1, "week");
    }

    return wednesdays;
  }, []);

  // Get the next 4 Wednesdays
  const nextWednesdays = getNextWednesdays();

  // Determine the maximum date in the RadioGroup
  const maxRadioDate = nextWednesdays[nextWednesdays.length - 1];

  // Handle RadioGroup change
  const handleRadioChange = (event) => {
    const date = dayjs(event.target.value)
      .hour(16)
      .minute(0)
      .tz("Asia/Ho_Chi_Minh"); // Set default time to 16:00
    setSelectedDate(date);
    setDateString(event.target.value);

    const formattedDate = {
      date: date.format("YYYY-MM-DD"),
      timestamp: date.unix().toString(),
      timezone: "Asia/Ho_Chi_Minh",
    };

    const endDate = {
      date: date.format("YYYY-MM-DD"),
      timestamp: date.add(1, "hour").unix().toString(), // End time at 17:00
      timezone: "Asia/Ho_Chi_Minh",
    };

    field.onChange({ start_time: formattedDate, end_time: endDate });
  };

  // Disable Radio buttons if selectedDate is greater than maxRadioDate
  const isDateSelectedInRadioGroup = (date) => {
    return selectedDate && date.isAfter(maxRadioDate, "day");
  };

  // Disable non-Wednesday dates in the DatePicker
  const shouldDisableDate = (date) => {
    const isWednesday = date.day() === 3;
    const isInTheFuture = date.isAfter(dayjs(), "day");
    return !isWednesday || !isInTheFuture;
  };

  useEffect(() => {
    const stringDate = field.value?.start_time?.date;

    const date = dayjs(stringDate).hour(16).minute(0).tz("Asia/Ho_Chi_Minh"); // Set default time to 16:00
    setSelectedDate(date);
    setDateString(stringDate);
  }, [field.value]);

  return (
    <Box display="flex" justifyContent="space-between">
      {/* RadioGroup for selecting date */}
      <FormControl component="fieldset" sx={{ marginTop: 3 }}>
        <FormLabel component="legend" sx={{ marginBottom: 2 }}>
          Select Date
        </FormLabel>
        <RadioGroup value={dateString} onChange={handleRadioChange}>
          {nextWednesdays.map((date, index) => (
            <FormControlLabel
              key={index}
              value={date.format("YYYY-MM-DD")}
              control={<Radio />}
              label={date.format("DD MMMM YYYY")}
              disabled={isDateSelectedInRadioGroup(date)} // Disable if selectedDate is greater than maxRadioDate
            />
          ))}
        </RadioGroup>
      </FormControl>

      {/* Static DatePicker */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker
          displayStaticWrapperAs="desktop"
          value={selectedDate}
          onChange={(newValue) => {
            const startDate = newValue
              .hour(16)
              .minute(0)
              .tz("Asia/Ho_Chi_Minh"); // Set default start time to 16:00
            const endDate = startDate.add(1, "hour"); // Set default end time to 17:00

            setSelectedDate(startDate);

            const formattedStartDate = {
              date: startDate.format("YYYY-MM-DD"),
              timestamp: startDate.unix().toString(),
              timezone: "Asia/Ho_Chi_Minh",
            };

            const formattedEndDate = {
              date: endDate.format("YYYY-MM-DD"),
              timestamp: endDate.unix().toString(),
              timezone: "Asia/Ho_Chi_Minh",
            };

            field.onChange({
              start_time: formattedStartDate,
              end_time: formattedEndDate,
            });

            // Set RadioGroup value if the selected date matches any of the options
            const matchingRadioValue = nextWednesdays.find((date) =>
              date.isSame(startDate, "day")
            );
            if (matchingRadioValue) {
              setDateString(matchingRadioValue.format("YYYY-MM-DD"));
            } else {
              setDateString(""); // Reset RadioGroup selection if no match
            }
          }}
          shouldDisableDate={shouldDisableDate}
          slotProps={{
            textField: {
              variant: "contain",
            },
          }}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default EventDateTimePicker;
