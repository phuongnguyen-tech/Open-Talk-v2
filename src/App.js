import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import NotFound from "./pages/notfound/index.js";
import Home from "./pages/home";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider } from "@mui/material";
import theme from "./theme.js";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
