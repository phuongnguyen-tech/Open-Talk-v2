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
import EventDescription from "../../../components/event-description";

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
      my={2}
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
      >
        <Typography variant="h5" fontWeight="bold">
          Event Schedule
        </Typography>
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
    <Stack direction="row" spacing={2} alignItems="flex-start">
      <Box sx={{ width: 120, overflow: "hidden" }}>
        <Typography style={{ whiteSpace: "pre-line" }}>
          {useFormattedDateTime(mockEventData.date.start_time.timestamp)}
        </Typography>
      </Box>

      <Box
        sx={{
          width: "100%",
          mt: 2,
          p: 2,
          border: 1,
          borderRadius: 2,
          maxHeight: "100%",
          overflowY: "auto", // Enable vertical scrolling
        }}
      >
        <Stack direction="row" justifyContent="space-between" mb={1}>
          <Typography fontWeight="bold" variant="subtitle1">
            {mockEventData.topic}
          </Typography>
          <IconButton color="warning" onClick={onEdit}>
            <EditIcon />
          </IconButton>
        </Stack>
        <EventDescription description={mockEventData.description} />

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
