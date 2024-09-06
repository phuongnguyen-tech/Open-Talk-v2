import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Stack,
  Avatar,
} from "@mui/material";
import LoupeIcon from "@mui/icons-material/Loupe";
import EditIcon from "@mui/icons-material/DriveFileRenameOutline";
import EditEventForm from "./event-edit-form-test";
import EventCreateForm from "./event-create-form-test";
import useFormattedDateTime from "../../../hooks/use-formatted-date-time";

const mockEventData = {
  topic: "Quarterly Review Meeting",
  description:
    "Dự báo trong những ngày cuối tháng 8, miền Trung tiếp tục có nắng nóng gay gắt, từ đầu tháng 9 nắng nóng dịu dần. Khu vực đồng bằng Bắc Bộ, tỉnh Hoà Bình những ngày cuối tháng 8 cũng có nắng nóng. Tây Nguyên, Nam Bộ, Nam Trung Bộ mưa dông vào chiều tối và tối.Dự báo trong những ngày cuối tháng 8, miền Trung tiếp tục có nắng nóng gay gắt, từ đầu tháng 9 nắng nóng dịu dần. Khu vực đồng bằng Bắc Bộ, tỉnh Hoà Bình Dự báo trong những ngày cuối tháng 8, miền Trung tiếp tục có nắng nóng gay gắt, từ đầu tháng 9 nắng nóng dịu dần. Khu vực đồng bằng Bắc Bộ, tỉnh Hoà Bình",
  attachment: null, // Assuming no file is attached
  date: {
    start_time: {
      date: "2024-08-28",
      timestamp: "1724835600",
      timezone: "Asia/Ho_Chi_Minh",
    },
    end_time: {
      date: "2024-08-28",
      timestamp: "1724839200",
      timezone: "Asia/Ho_Chi_Minh",
    },
  },
  user: "Phuong Nguyen",
};

export default function EventView() {
  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);

  const openCreateDialog = () => {
    setCreateDialogOpen(true);
  };

  const closeCreateDialog = () => {
    setCreateDialogOpen(false);
  };

  const openEditDialog = () => {
    setEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setEditDialogOpen(false);
  };

  return (
    <Box
      maxWidth={800}
      maxHeight={400}
      mx="auto"
      mt={4}
      mb={2}
      p={2}
      borderRadius={4}
      boxShadow={3}
      bgcolor="background.paper"
    >
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
        marginBottom={2}
      >
        <Typography variant="h1">Event Schedule</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<LoupeIcon />}
          onClick={openCreateDialog}
        >
          Add Event
        </Button>
      </Stack>

      {[...Array(2)].map((_, index) => (
        <EventCard key={index} onEdit={openEditDialog} />
      ))}

      <EventCreateForm open={isCreateDialogOpen} onClose={closeCreateDialog} />
      <EditEventForm
        open={isEditDialogOpen}
        onClose={closeEditDialog}
        eventData={mockEventData}
      />
    </Box>
  );
}

function EventCard({ onEdit }) {
  return (
    <Stack direction="row" spacing={2} alignItems="flex-start" marginBottom={1}>
      <Box sx={{ width: 132, overflow: "hidden" }}>
        <Typography style={{ whiteSpace: "pre-line" }} variant="body1">
          {useFormattedDateTime(mockEventData.date.start_time.timestamp)}
        </Typography>
      </Box>

      <Box
        sx={{
          width: "100%",
          py: 1,
          px: 3,
          border: 1,
          borderRadius: 4,
        }}
      >
        <Stack direction="row" justifyContent="space-between" height={32}>
          <Typography fontWeight="bold" variant="subtitle1">
            {mockEventData.topic}
          </Typography>
          <IconButton color="warning" onClick={onEdit}>
            <EditIcon />
          </IconButton>
        </Stack>
        <Typography variant="body2" color="textSecondary" marginBottom={1}>
          Web,12/09/2024 5PM - 6PM
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar sx={{ width: 24, height: 24, marginRight: 1 }} />
          <Typography variant="body2" fontWeight={600}>
            {mockEventData.user}
          </Typography>
        </Box>
      </Box>
    </Stack>
  );
}
