import React, { useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";

const FileUpload = () => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files || []);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleDeleteFile = (fileName) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={2}>
              <Button
                variant="contained"
                component="label"
                startIcon={<UploadFileIcon />}
              >
                Upload Files
                <input
                  type="file"
                  multiple
                  hidden
                  onChange={handleFileChange}
                />
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography>File Name</Typography>
            </TableCell>
            <TableCell>
              <Typography>Action</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {files.map((file) => (
            <TableRow key={file.name}>
              <TableCell>{file.name}</TableCell>
              <TableCell>
                <IconButton
                  onClick={() => handleDeleteFile(file.name)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FileUpload;
