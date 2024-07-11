import React from 'react'
import NavBar from "./Navbar";
import FileList from '../Components/uploadFile/FileList';
import { Container, Grid } from '@mui/material';

const Home:React.FC = () => {
  return (
    <>
    <NavBar/>
    <Container maxWidth="xl">
   
          <FileList />
    
    </Container>
  
    </>
  )
}

export default Home