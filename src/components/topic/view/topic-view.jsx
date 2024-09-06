import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Stack,
  Avatar,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import DeleteIcon from "@mui/icons-material/Delete";
import LoupeIcon from "@mui/icons-material/Loupe";
import logo from "../../../logo.svg";
import TopicCreateForm from "../topic-create-form";
import CustomDescription from "../../custom-description";

const mockData = {
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

export default function TopicView({ userInfo }) {
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <Box
      maxWidth={800}
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
        marginBottom={2}
      >
        <Typography variant="h1">Requested Topics </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<LoupeIcon />}
          onClick={handleClickOpen}
        >
          Request a Topic
        </Button>
      </Stack>
      {/* Truyền userInfo làm prop vào TopicCard */}
      {[...Array(2)].map((_, index) => (
        <TopicCard key={index} userInfo={userInfo} />
      ))}
      <TopicCreateForm open={openDialog} onClose={handleClose} />
    </Box>
  );
}

function TopicCard({ userInfo, topics }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleLikeClick = () => {
    setSelectedOption(selectedOption === "like" ? null : "like");
  };

  const handleDislikeClick = () => {
    setSelectedOption(selectedOption === "dislike" ? null : "dislike");
  };

  return (
    <Stack direction="row" spacing={2} marginBottom={1}>
      <Stack
        textAlign="center"
        alignItems="center"
        justifyContent="center"
        sx={{ width: 132 }}
      >
        <Avatar
          src={userInfo.avatar_url || logo}
          alt="User Avatar"
          sx={{ width: 48, height: 48 }}
        />
        <Typography fontSize={12} fontWeight={600} mt={1}>
          {userInfo.name && userInfo.name.length > 0
            ? `${userInfo.name}`
            : "Demo account"}
        </Typography>
      </Stack>

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
            Apply AI in work
          </Typography>
          <IconButton color="secondary">
            <DeleteIcon color="error" />
          </IconButton>
        </Stack>
        <CustomDescription description={mockData.description} />
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton
            color={selectedOption === "like" ? "primary" : "default"}
            onClick={handleLikeClick}
          >
            <ThumbUpIcon />
          </IconButton>
          <Typography variant="body1">10</Typography>
          <IconButton
            color={selectedOption === "dislike" ? "primary" : "default"}
            onClick={handleDislikeClick}
          >
            <ThumbDownIcon />
          </IconButton>
          <Typography variant="body1">5</Typography>
        </Stack>
      </Box>
    </Stack>
  );
}
