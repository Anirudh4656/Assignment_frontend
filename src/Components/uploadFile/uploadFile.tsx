import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Checkbox, FormControlLabel, Typography, Box, TextField, List, ListItem, ListItemText, Snackbar, Alert } from '@mui/material';
import { RootState, AppDispatch } from '../../Store/store';
import { uploadFiles, fetchFiles } from '../../Store/reducers/filereducer'
import { useUploadFileMutation }from "../../Services/file"
interface FormData {
    append: any;
    user:string;
    filename: string;
    filepath: string;
    isPublic: boolean;
  }
const FileUpload: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
  const [isPublic, setIsPublic] = useState(false);
  const [user, setUser] = useState('userId'); // Replace with actual user ID or fetch from state/context
  const [filename, setFilename] = useState('');
  const [filepath, setFilepath] = useState('');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const [uploadFile] = useUploadFileMutation();
//   const { error } = useSelector((state: RootState) => state.files);

///logic for checking whether it needs to get plan or not
// useEffect(() => {
//     if (!user) return;
//     // Check if the user has a plan and if it's expired
//     if (!user.plan || user.planExpiresAt < new Date()) {
//       // Handle logic for prompting user to purchase a plan
//       console.log('User needs to purchase a plan!');
//     }
//   }, [user]);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
        // const selectedFile = e.target.files[0];
      
        setFile(e.target.files[0]);
        console.log('console.log',file)
       
      
        // setFilepath(URL.createObjectURL(e.target.files[0]));
    }
  };
  const handleClose = () => {
    setOpen(false);
    setError(null);
  };

  const handleUpload = async () => {    
   
  if(!file){
    return 
  }
      const formData = new FormData();
      formData.append('myFile', file);
     formData.append('isPublic', isPublic.toString());
      console.log("formData",...formData)
    

    
   
    try {
    
        const result = await uploadFile(formData).unwrap();
        console.log("Upload result:", result);
      } catch (error:any) {
        console.error("Error uploading file:", error);
        setError(error.data.message || 'An error occurred during file upload');
        setOpen(true);
      }
  };

  return (
    <Box>
    <Typography variant="h4">File List</Typography>
    <input type="file" onChange={handleFileChange} />
    <FormControlLabel
      control={<Checkbox checked={isPublic} onChange={() => setIsPublic(!isPublic)} />}
      label="Public"
    />
    <Button variant="contained" color="primary" onClick={handleUpload}>
      Upload
    </Button>
    {error && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      )}
  </Box>
  );
};

export default FileUpload;
