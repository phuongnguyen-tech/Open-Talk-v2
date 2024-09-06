import { useCallback } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";

// ----------------------------------------------------------------------

export default function TopicCreateForm({ onClose, ...other }) {
  const methods = useForm();

  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.info("DATA", data);

      // Simulate file upload or any other processing here
      await new Promise((resolve) => setTimeout(resolve, 500));

      reset();
      onClose();
    } catch (error) {
      console.error(error);
    }
  });

  const onCancel = useCallback(() => {
    onClose();
    reset();
  }, [onClose, reset]);

  return (
    <Dialog onClose={onClose} {...other}>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <DialogTitle color="primary" fontSize="28px" fontWeight="600">
            Request a Sharing Topic
          </DialogTitle>

          <DialogContent>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField {...field} label="Name " fullWidth sx={{ mt: 3 }} />
              )}
            />

            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description "
                  fullWidth
                  sx={{ mt: 3 }}
                  multiline
                  rows={4}
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
  );
}
