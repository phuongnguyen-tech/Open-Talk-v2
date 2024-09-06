import React, { useEffect } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  MenuItem,
  Typography,
  RadioGroup,
  TextField,
} from "@mui/material";
import { Controller } from "react-hook-form";

export default function EventChooseTopic({ control }) {
  const [value, setValue] = React.useState("choose");
  const [selectedTopic, setSelectedTopic] = React.useState("");
  const [newTopic, setNewTopic] = React.useState("");

  // Watch for changes in the selected topic and new topic
  useEffect(() => {
    if (value === "choose") {
      setSelectedTopic(""); // Reset selected topic
    } else {
      setNewTopic(""); // Reset new topic
    }
  }, [value]);

  return (
    <FormControl fullWidth>
      <FormLabel
        component="legend"
        sx={{
          mb: 2,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography marginRight={2}>Topic:</Typography>
        <RadioGroup
          value={value}
          onChange={(e) => setValue(e.target.value)}
          row
        >
          <FormControlLabel
            value="choose"
            control={<Radio color="primary" />}
            label="Select from pool"
          />
          <FormControlLabel
            value="add"
            control={<Radio color="primary" />}
            label="Add new topic"
          />
        </RadioGroup>
      </FormLabel>

      {value === "choose" ? (
        <Controller
          name="summary"
          control={control}
          render={({ field: { value, onChange } }) => (
            <TextField
              select
              label="Select Topic"
              value={selectedTopic}
              onChange={(e) => {
                setSelectedTopic(e.target.value);
                onChange(e.target.value); // Update form state
              }}
              fullWidth
              sx={{ mt: 2 }}
            >
              <MenuItem value="topic1">Topic 1</MenuItem>
              <MenuItem value="topic2">Topic 2</MenuItem>
            </TextField>
          )}
        />
      ) : (
        <Controller
          name="summary"
          control={control}
          render={({ field: { value, onChange } }) => (
            <TextField
              label="New Topic"
              value={newTopic}
              onChange={(e) => {
                setNewTopic(e.target.value);
                onChange(e.target.value); // Update form state
              }}
              fullWidth
              sx={{ mt: 2 }}
            />
          )}
        />
      )}
    </FormControl>
  );
}
