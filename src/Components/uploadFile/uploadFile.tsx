import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
  TextField,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Alert,
} from "@mui/material";
import { RootState, AppDispatch } from "../../Store/store";
import { uploadFiles, fetchFiles } from "../../Store/reducers/filereducer";
import { useUploadFileMutation } from "../../Services/file";
import { Navigate, useNavigate } from "react-router-dom";

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isPublic, setIsPublic] = useState(false);
  const [user, setUser] = useState("userId"); // Replace with actual user ID or fetch from state/context
  const [filename, setFilename] = useState("");
  const [filepath, setFilepath] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const [uploadFile] = useUploadFileMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      // const selectedFile = e.target.files[0];

      setFile(e.target.files[0]);
      console.log("console.log", file);
    }
  };
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("myFile", file);
    formData.append("isPublic", isPublic.toString());
    console.log("formData", ...formData);

    try {
      const result = await uploadFile(formData).unwrap();
      console.log("Upload result:", result);
      navigate("/");
    } catch (error: any) {
      console.error("Error uploading file:", error);
      
      setError(error.data.message || "An error occurred during file upload");
      setOpen(true);
      // if(error.data.message==="API Usage limit exceeded."){
      //   navigate('/plan')
      // }
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "#fff",
        maxWidth: 400,
        mx: "auto",
      }}
    >
      <Typography variant="h4" sx={{ mb: 2 }}>
        File List
      </Typography>
      <input
        type="file"
        onChange={handleFileChange}
        style={{ marginBottom: "16px", display: "block" }}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={isPublic}
            onChange={() => setIsPublic(!isPublic)}
            sx={{ color: "primary.main" }}
          />
        }
        label="Public"
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        sx={{ mb: 2, width: "100%" }}
      >
        Upload
      </Button>
      {error && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default FileUpload;
