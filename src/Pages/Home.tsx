import React from 'react'
import NavBar from "./Navbar";
import FileList from '../Components/uploadFile/FileList';
import { Container, Grid } from '@mui/material';

const Home:React.FC = () => {
  return (
    <>
    <NavBar/>
    <Container maxWidth="xl">
    <Grid container  spacing={3}>
          <FileList />
     </Grid>
    </Container>
  
    </>
  )
}

export default Home