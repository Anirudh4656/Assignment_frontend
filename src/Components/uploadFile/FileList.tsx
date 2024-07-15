import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFilesQuery } from "../../Services/file";
import { AppDispatch, RootState } from "../../Store/store";
import Pagination from "./Pagination";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import LockIcon from "@mui/icons-material/Lock";
import { usePrivateFilesMutation } from "../../Services/file";
import { useNavigate } from "react-router-dom";

const FileList: React.FC = () => {
  const currentPage: number = useSelector((state: RootState) => state.file.currentPage);
  const { data: files, error } = useFilesQuery({currentPage});
  console.log("files after pagination", files);
  const [openAccessDialog, setOpenAccessDialog] = React.useState<boolean>(false);
  const [selectedFile, setSelectedFile] = React.useState<any>(null);
  const [accessKey, setAccessKey] = React.useState("");
  const [errors, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [privateFile] = usePrivateFilesMutation();
  console.log("in data of FileList", privateFile);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      setError("Error: Too many requests");
      setOpen(true);
    }
  }, [error]);

  const handleDownload = (file: any) => {
    console.log("in file", file);
    if (file) {
      window.open(`http://localhost:${5000}/file/${file._id}`, "_blank");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setError(null);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    refetch();
  };

  const handleAccessSubmit = async () => {
    try {
      const response = await privateFile({
        accessKey,
        id: selectedFile._id,
      }).unwrap();
      console.log(response, "access");
      if (response?.statusCode === 200) {
        console.log("files",selectedFile);
        handleDownload(selectedFile);
        setOpenAccessDialog(false);
        setAccessKey("");
        setError("");
      }
    } catch (error: any) {
      setOpenAccessDialog(false);
      console.log("error", error);
      setError(error.data.message || "An error occurred during file Download");
      console.log("in error", errors);
      console.log(open);
      setOpen(true);
      if (error.data.error_code === 404 || 429 || 404) {
        navigate("/plans");
      }
      console.log(open);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Uploaded Files
      </Typography>
      {errors && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {errors}
          </Alert>
        </Snackbar>
      )}
      <Box sx={{ display: "flex", flexDirection: "column", flexWrap: "wrap", gap: 2, p: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 2, p: 2 }}>
          {files?.data?.files.map((file: any) => (
            <Card key={file._id} sx={{ maxWidth: 345, minWidth: 300 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {file.filename}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Size: {file.filesize} bytes
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Created At: {new Date(file.createdAt).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Uploaded By: {file.user}
                </Typography>
              </CardContent>
              <CardActions>
                {file.isPublic ? (
                  <Button size="small" color="primary" onClick={() => handleDownload(file)}>
                    View/Download
                  </Button>
                ) : (
                  <Button size="small" color="primary" onClick={() => {
                    setSelectedFile(file);
                    setOpenAccessDialog(true);
                  }}>
                    Enter Access Key
                  </Button>
                )}
                <IconButton aria-label={file.isPublic ? "public" : "private"}>
                  {file.isPublic ? <PublicIcon /> : <LockIcon />}
                </IconButton>
              </CardActions>
            </Card>
          ))}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            totalPages={files?.data.NumberOfPages}
            currentPage={files?.data.currentPage}
          />
        </Box>
      </Box>
      <Dialog open={openAccessDialog} onClose={() => setOpenAccessDialog(false)}>
        <DialogTitle>Enter Access Key</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="accessKey"
            label="Access Key"
            type="password"
            fullWidth
            value={accessKey}
            onChange={(e) => setAccessKey(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAccessDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAccessSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FileList;
