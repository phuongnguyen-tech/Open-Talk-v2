import React, { useEffect, useState } from "react";
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
import EventChooseTopic from "../event-choose-topic";
import EventDateTimePicker from "../event-date-time-picker";

// import useUserAuth from "../../hooks/use-user-auth";

export default function EditEventForm({ open, onClose, eventData }) {
  const methods = useForm({
    defaultValues: {
      topicSelection: eventData?.topic || "",
      description: eventData?.description || "",
      attachment: eventData?.attachment || null,
      date: {
        start_time: {
          date: eventData?.date?.start_time?.date || "",
          timestamp: eventData?.date?.start_time?.timestamp || "",
          timezone: eventData?.date?.start_time?.timezone || "",
        },
        end_time: {
          date: eventData?.date?.end_time?.date || "",
          timestamp: eventData?.date?.end_time?.timestamp || "",
          timezone: eventData?.date?.end_time?.timezone || "",
        },
      },
    },
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  // const { userAccessToken } = useUserAuth();

  useEffect(() => {
    if (open) {
      reset({
        topicSelection: eventData?.topic || "",
        description: eventData?.description || "",
        attachment: null,
        date: {
          start_time: {
            date: eventData?.date?.start_time?.date || "",
            timestamp: eventData?.date?.start_time?.timestamp || "",
            timezone: eventData?.date?.start_time?.timezone || "",
          },
          end_time: {
            date: eventData?.date?.end_time?.date || "",
            timestamp: eventData?.date?.end_time?.timestamp || "",
            timezone: eventData?.date?.end_time?.timezone || "",
          },
        },
      });
    }
  }, [open, eventData, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      // Example of validating and processing data
      console.log("DATA: ", data);

      // Save event

      // Display success message
      setSnackbar({
        open: true,
        message: "Event updated successfully",
        severity: "success",
      });
      reset();
      onClose();
    } catch (error) {
      console.error("Error updating event:", error);
      setSnackbar({
        open: true,
        message: "An error occurred. Please try again.",
        severity: "error",
      });
    }
  });

  const handleCloseSnackbar = () =>
    setSnackbar({ open: false, message: "", severity: "" });

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <FormProvider {...methods}>
          <form onSubmit={onSubmit}>
            <DialogTitle variant="h4" fontWeight="bold" color="primary">
              Edit Event
            </DialogTitle>

            <DialogContent>
              <Controller
                name="topicSelection"
                control={control}
                render={({ field }) => (
                  <EventChooseTopic
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                  />
                )}
              />

              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Description *"
                    fullWidth
                    sx={{ mt: 3 }}
                    multiline
                    rows={4}
                  />
                )}
              />

              <Controller
                name="date"
                control={control}
                render={({ field }) => <EventDateTimePicker field={field} />}
              />
            </DialogContent>

            <DialogActions>
              <Button
                color="inherit"
                variant="outlined"
                onClick={() => {
                  onClose();
                  reset();
                }}
              >
                Cancel
              </Button>

              <LoadingButton
                type="submit"
                color="primary"
                variant="contained"
                loading={isSubmitting}
              >
                Save
              </LoadingButton>
            </DialogActions>
          </form>
        </FormProvider>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
