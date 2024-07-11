// src/components/FileList.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFilesQuery } from "../../Services/file";
import { RootState, AppDispatch } from '../../Store/store';
import { Box, Card, CardActions, CardContent, Button, Typography, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Snackbar, Alert } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';
import {   usePrivateFilesMutation } from '../../Services/file'
const FileList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data:files }=useFilesQuery();
  const [openAccessDialog, setOpenAccessDialog] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<any>(null);
  const [accessKey, setAccessKey] = React.useState('');
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [privateFile]=usePrivateFilesMutation();
  console.log("in data of FileList",privateFile);

  const handleDownload = (file:any) => {
    console.log("in file",file)
    if (file) {
      window.open(`http://localhost:${5000}/api/file/${file._id}`, "_blank");
    }
  // };
  }
  const handleClose = () => {
    setOpen(false);
    setError(null);
  };

  const handleAccessSubmit = async() => {
    // Here you would typically handle the access key validation
    // For demonstration, I'm just closing the dialog
    try{
      
        const response = await privateFile({accessKey,id:selectedFile._id}).unwrap()
        console.log(response,'access');
        if (response?.data?.statusCode === 200) {
          handleDownload(selectedFile);
          setOpenAccessDialog(false);
          setAccessKey('');
          setError('');
        }
      
    }catch(error:any){
      setOpenAccessDialog(false);
      setError(error.data.data.message || 'An error occurred during file Download');
console.log('in error')
    
      setOpen(true);
    }
     
    
   
   
    
  };
  return (
    <Box>
    <Typography variant="h4" gutterBottom>
      Uploaded Files
    </Typography>
    {error && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      )}
       <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, p: 2 }}>
    {files?.data.map((file: any) => (
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
        {file.isPublic ?
          <Button
            size="small"
            color="primary"
            onClick={() => handleDownload(file)}
          >
           "View/Download" 
          </Button>:  <Button
            size="small"
            color="primary"
            onClick={() => {
              setSelectedFile(file);
              setOpenAccessDialog(true)
             
            }}
          >
           "Enter Access Key" 
          </Button>
          
        }
          <IconButton aria-label={file.isPublic ? "public" : "private"}>
            {file.isPublic ? <PublicIcon /> : <LockIcon />}
          </IconButton>
        </CardActions>
      </Card>
    ))}
</Box>
    {/* Access Key Dialog */}
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
