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

export default function TopicView({ userInfo }) {
  const [topics, setTopics] = useState([]);
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
      >
        <Typography variant="h5" fontWeight="bold">
          Requested Topics {topics.length}
        </Typography>
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
        <TopicCard key={index} userInfo={userInfo} topics={topics} />
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
    <Stack direction="row" spacing={2} alignItems="center">
      <Stack
        textAlign="center"
        alignItems="center"
        justifyContent="center"
        sx={{ marginRight: 4, Width: 120 }}
      >
        <Avatar
          src={userInfo.avatar_url || logo}
          alt="User Avatar"
          sx={{ width: 72, height: 72 }}
        />
        <Typography variant="body2" fontWeight={600} mt={1}>
          {userInfo.name && userInfo.name.length > 0
            ? `Welcome, ${userInfo.name}`
            : "Demo account"}
        </Typography>
      </Stack>

      <Box mt={2} p={2} border={1} borderRadius={2}>
        <Stack direction="row" justifyContent="space-between">
          <Typography fontWeight="bold" variant="subtitle1">
            Apply AI in work
          </Typography>
          <IconButton color="secondary">
            <DeleteIcon color="error" />
          </IconButton>
        </Stack>
        <Typography variant="body2" color="textSecondary" pr={2}>
          Every user accessing OpenTalk has permission to vote up or down for
          each requested topic once. Voting is done directly on the requested
          topic list from homepage of OpenTalk.
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1} mt={1}>
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
