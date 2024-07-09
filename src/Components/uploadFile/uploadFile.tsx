import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Checkbox, FormControlLabel, Typography, Box, TextField, List, ListItem, ListItemText } from '@mui/material';
import { RootState, AppDispatch } from '../../Store/store';
import { uploadFiles, fetchFiles } from '../../Store/reducers/filereducer'
import { useUploadFileMutation }from "../../Services/file"
interface FormData{
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
    if (e.target.files) {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setFilename(selectedFile.name);
        setFilepath(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {    
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('filename', filename);
    formData.append('filepath', filepath);
    formData.append('isPublic', isPublic.toString());

    try {
        const result = await uploadFile(formData).unwrap();
        console.log("Upload result:", result);
      } catch (error) {
        console.error("Error uploading file:", error);
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
   
  </Box>
  );
};

export default FileUpload;
