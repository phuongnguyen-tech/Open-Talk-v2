import React, { useState } from "react";
import {
  Autocomplete,
  TextField,
  Avatar,
  Box,
  Chip,
  ClickAwayListener,
} from "@mui/material";

const top100Guests = [
  {
    id: 1,
    name: "John Doe",
    avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 3,
    name: "John Doe",
    avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 4,
    name: "Jane Smith",
    avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 5,
    name: "John Doe",
    avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 6,
    name: "Jane Smith",
    avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 7,
    name: "John Doe",
    avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 8,
    name: "Jane Smith",
    avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 9,
    name: "John Doe",
    avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 12,
    name: "Jane Smith",
    avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  // Add more guests as needed
];

const AddGuest = ({ field }) => {
  const [selectedGuests, setSelectedGuests] = useState([]);
  const [open, setOpen] = useState(false);

  const handleSelectAll = () => {
    if (selectedGuests.length === top100Guests.length) {
      setSelectedGuests([]);
    } else {
      setSelectedGuests(top100Guests);
      setOpen(false);
    }
  };

  const handleChange = (event, newValue) => {
    if (newValue.some((item) => item.id === "all")) {
      handleSelectAll();
    } else {
      setSelectedGuests(newValue);
    }
  };

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div>
        <Autocomplete
          multiple
          disablePortal
          sx={{ mt: 2 }}
          options={[{ id: "all", name: "All" }, ...top100Guests]}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={handleChange}
          onOpen={() => setOpen(true)}
          open={open}
          onClose={() => {
            /* Do nothing on close */
          }}
          renderInput={(params) => (
            <TextField {...params} label="Select Guests" />
          )}
          renderOption={(props, option) => (
            <li {...props}>
              <Avatar src={option.avatarUrl} sx={{ marginRight: 2 }} />
              {option.name}
            </li>
          )}
          {...field} // Pass field props to Autocomplete
        />

        <Box mt={2} display="flex" gap={1} flexWrap="wrap">
          {selectedGuests.slice(0, 5).map((guest) => (
            <Avatar
              key={guest.id}
              src={guest.avatarUrl}
              sx={{ width: 40, height: 40, marginRight: 1 }}
            />
          ))}
          {selectedGuests.length > 5 && (
            <Chip
              label={`+${selectedGuests.length - 5}`}
              sx={{
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          )}
        </Box>
      </div>
    </ClickAwayListener>
  );
};

export default AddGuest;
