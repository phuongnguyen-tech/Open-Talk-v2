import React, { useCallback } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import useUserAuth from "../../hooks/use-user-auth";
import { createCalendarEvent } from "../../api/event";

dayjs.extend(utc);
dayjs.extend(timezone);

const validateWednesday = (date) => {
  const now = dayjs();
  return date.isAfter(now, "day") && date.day() === 3;
};

const generateStartEndTimes = (date) => {
  const startTime = dayjs(date).hour(16).minute(0).second(0);
  const endTime = dayjs(date).hour(17).minute(0).second(0);
  return { startTime, endTime };
};

const EventCreateForm = ({ onClose, ...other }) => {
  const methods = useForm({
    defaultValues: {
      description: "",
      attachment: "",
      date: null,
      topic: "", // thêm trường topic
    },
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // Trạng thái thông báo lỗi và thành công
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const { userAccessToken } = useUserAuth(); // Giả sử token được quản lý qua hook

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { startTime, endTime } = generateStartEndTimes(data.date);

      // Tạo payload với thời gian start và end
      const eventData = {
        ...data,
        start_time: {
          date: startTime.format("YYYY-MM-DD"),
          timestamp: startTime.unix().toString(),
          timezone: dayjs.tz.guess(),
        },
        end_time: {
          date: endTime.format("YYYY-MM-DD"),
          timestamp: endTime.unix().toString(),
          timezone: dayjs.tz.guess(),
        },
      };

      console.log("DATA: ", eventData);

      // Lưu sự kiện
      await createCalendarEvent(eventData, userAccessToken);

      // Đưa người dùng về trang chủ
      window.location.href = "/";

      // Hiển thị thông báo thành công
      setSuccess("Event created successfully");
      setOpenSnackbar(true);
      reset();
      onClose();
    } catch (error) {
      console.error("Error creating event:", error);
      setError("An error occurred while creating the event. Please try again.");
      setOpenSnackbar(true);
    }
  });

  const onCancel = useCallback(() => {
    onClose();
    reset();
  }, [onClose, reset]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setError("");
    setSuccess("");
  };

  return (
    <>
      <Dialog onClose={onClose} {...other}>
        <FormProvider {...methods}>
          <form onSubmit={onSubmit}>
            <DialogTitle>Register a Talk Event</DialogTitle>

            <DialogContent>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Description"
                    fullWidth
                    sx={{ mt: 3 }}
                    multiline
                    rows={4}
                  />
                )}
              />

              <Controller
                name="attachment"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Select File *"
                    fullWidth
                    sx={{ mt: 3 }}
                  />
                )}
              />

              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    renderInput={(props) => <TextField {...props} />}
                    disablePast
                    shouldDisableDate={(date) =>
                      !validateWednesday(dayjs(date))
                    }
                    label="Select a Wednesday"
                  />
                )}
              />

              {/* Chọn chủ đề */}
              <Controller
                name="topic"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Select or Enter Topic"
                    fullWidth
                    sx={{ mt: 3 }}
                  />
                )}
              />
            </DialogContent>

            <DialogActions>
              <Button color="inherit" variant="outlined" onClick={onCancel}>
                Cancel
              </Button>

              <LoadingButton
                type="submit"
                color="primary"
                variant="contained"
                loading={isSubmitting}
              >
                Submit
              </LoadingButton>
            </DialogActions>
          </form>
        </FormProvider>
      </Dialog>

      {/* Thông báo lỗi và thành công */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={error ? "error" : "success"}
        >
          {error || success}
        </Alert>
      </Snackbar>
    </>
  );
};

// // Giả lập các hàm API
// const checkTimeRangeAvailability = async (eventData) => {
//   // Gọi API để kiểm tra thời gian
//   return true; // Giả lập: trả về true nếu thời gian hợp lệ
// };

// const checkTopicAvailability = async (topic) => {
//   // Gọi API để kiểm tra chủ đề
//   return true; // Giả lập: trả về true nếu chủ đề hợp lệ
// };

// const saveNewTopic = async (topic) => {
//   // Gọi API để lưu chủ đề mới
// };

// const sendMeetingInvitations = async () => {
//   // Gọi API để gửi lời mời họp
// };

export default EventCreateForm;
