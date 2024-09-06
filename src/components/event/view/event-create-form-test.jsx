import React, { useCallback, useState } from "react";
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

import EventDateTimePicker from "../event-date-time-picker";
import { Autocomplete, Box } from "@mui/material";
import AddGuest from "../event-add-guest";
import FileUpload from "../event-file-upload";

export default function EventCreateForm({ onClose, ...other }) {
  const methods = useForm({
    defaultValues: {
      description: "",
      attachment: null,
      date: {
        start_time: {
          date: "",
          timestamp: "",
          timezone: "",
        },
        end_time: {
          date: "",
          timestamp: "",
          timezone: "",
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

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    // try {
    //   console.log("DATA: ", data);
    //   await createCalendarEvent(data, userAccessToken);
    //   setSuccess("Event created successfully");
    //   setOpenSnackbar(true);
    //   reset();
    //   onClose();
    // } catch (error) {
    //   console.error("Error creating event:", error);
    //   setError("An error occurred while creating the event. Please try again.");
    //   setOpenSnackbar(true);
    // }
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

  const top100Films = [
    { label: "The Godfather", id: 1 },
    { label: "Pulp Fiction", id: 2 },
  ];

  return (
    <>
      <Dialog onClose={onClose} {...other} maxWidth="sm" fullWidth>
        <FormProvider {...methods}>
          <form onSubmit={onSubmit}>
            <DialogTitle color="primary" fontSize="28px" fontWeight="600">
              Register a Talk Event
            </DialogTitle>

            <DialogContent
              sx={{
                maxHeight: "600px", // Giới hạn chiều cao
                overflowY: "auto", // Kích hoạt cuộn dọc
              }}
            >
              <Box display="flex" alignItems="center" gap={2} marginTop={2}>
                <Controller
                  name="topicSelection"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      disablePortal
                      options={top100Films}
                      fullWidth
                      renderInput={(params) => (
                        <TextField {...params} label="Event Name" />
                      )}
                    />
                  )}
                />

                <Button
                  variant="contained"
                  sx={{ width: "180px" }}
                  onClick={() => setShowDescription(!showDescription)}
                >
                  {showDescription ? "Hide Description" : "Add Description"}
                </Button>
              </Box>

              {showDescription && (
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
              )}

              <Box>
                <Controller
                  name="addGuest"
                  control={control}
                  render={({ field }) => <AddGuest {...field} />}
                />

                <Controller
                  name="date"
                  control={control}
                  render={({ field }) => <EventDateTimePicker field={field} />}
                />
              </Box>

              <Controller
                name="attachment"
                control={control}
                render={({ field }) => <FileUpload />}
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
}
