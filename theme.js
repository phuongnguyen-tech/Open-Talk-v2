// theme.js
import { createTheme } from "@mui/material/styles";

// Tạo theme với cấu hình tùy chỉnh
const theme = createTheme({
  typography: {
    fontFamily: "Garamond, serif",
    body1: {
      fontSize: "14px",
      color: "#000", // Màu đen cho text bình thường
    },
    h2: {
      fontSize: "16px",
      fontWeight: 600, // Semi-bold cho title2
    },
    h1: {
      fontSize: "18px",
      fontWeight: 700, // Bold cho title1
    },
  },
  palette: {
    primary: {
      main: "#1976d2", // Màu primary cho button
      contrastText: "#fff", // Màu text trắng cho button
    },
    // Cấu hình màu cho các hiệu ứng hover và focus
    action: {
      hover: "#1565c0", // Màu đậm hơn cho hover
      focus: "#0d47a1", // Màu đậm hơn cho focus
    },
  },
  components: {
    // Cấu hình style cho button
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#fff", // Màu chữ trắng cho button
          backgroundColor: "#1976d2", // Màu nền primary
          "&:hover": {
            backgroundColor: "#1565c0", // Màu đậm hơn cho hover
          },
          "&:focus": {
            backgroundColor: "#0d47a1", // Màu đậm hơn cho focus
          },
          textTransform: "unset",
        },
        text: {
          // Styles for text buttons
          color: "#9e9e9e", // Light gray text color
          fontSize: "12px", // Smaller font size
          textTransform: "none", // Prevent uppercase transformation
          backgroundColor: "transparent",
          "&:hover": {
            backgroundColor: "transparent",
            TextDecoder: "solid",
          },
        },
      },
    },
  },
});

export default theme;
