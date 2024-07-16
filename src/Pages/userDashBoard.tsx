import React, { useEffect, useState } from 'react';
import { Typography, CircularProgress, Grid, Paper, makeStyles, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../Store/store';
import { useUserQuery } from '../Services/adminapi';
import { useParams } from 'react-router-dom';



interface Plan {
  _id: string;
  name: string;
  price: number;
}


const Dashboard: React.FC = () => {
//   const classes = useStyles();
const { id } = useParams<{ id: string  }>()
const userData= useSelector((state:RootState)=>state.auth.user)
if(!userData || !id){
    return
}
console.log("user in dashbpard:",id)
//   const [loading, setLoading] = useState(true);
  const {data}=useUserQuery({id} );
  console.log("user dashboard",data);
  const remaingApiCalls=data?.data?.plan[0].apiLimit-data?.data?.apiUsage;
  const totalApiCalls = data?.data?.plan[0].apiLimit || 0;
const usedPercentage = (data?.data?.apiUsage / totalApiCalls) * 100;
const storageUsed=data?.data?.storageUsage/1024/1024;
  const remaingStorage=data?.data?.plan[0].storageLimit-data?.data?.storageUsage/1024/1024;
  const usedStoragePercentage = ( storageUsed/ data?.data?.plan[0].storageLimit) * 100;
//   console.log(remaingApiCalls,"call is",data?.data?.plan[0].apiLimit,data?.data?.apiUsage)
//   const [userData, setUserData] = useState<User | null>(null);


//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         // const response = await axios.get<User>('/api/user/profile');
//         // setUserData(response.data);
//       } catch (error) {
//         console.error('Error fetching user profile:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, []);

//   if (loading) {
//     return <CircularProgress />;
//   }


  return (
    <Box p={3}>
    <Typography variant="h4" gutterBottom>User Dashboard</Typography>
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Paper sx={{ p: 2, backgroundColor: '#f0f0f0' }}>
          <Typography variant="h5" sx={{ marginBottom: 1 }}>Personal Information</Typography>
         
          <Typography variant="body1">Username: {data?.data?.username}</Typography>
          <Typography variant="body1">Email: {data?.data?.email}</Typography>
          <Typography variant="body1">Role: {data?.data?.role}</Typography>
          {/* <Typography variant="body1">
            Joined Date: {userData.joinedDate.toLocaleDateString()}
          </Typography> */}
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
      <Paper sx={{ p: 2, backgroundColor: '#f0f0f0', textAlign: 'center' }}>
            <Typography variant="h5" sx={{ marginBottom: 1 }}>Storage Usage</Typography>
            <CircularProgress variant="determinate" value={usedStoragePercentage} size={100} />
            <Typography variant="body1">
            Remaining Storage: {remaingStorage <=0 ?"Expired" :remaingStorage }
            </Typography>
            <Typography variant="body1">
              Total Storage Limit:{data?.data?.plan[0].storageLimit}GB
            </Typography>
          </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
      <Paper sx={{ p: 2, backgroundColor: '#f0f0f0', textAlign: 'center' }}>
            <Typography variant="h5" sx={{ marginBottom: 1 }}>API Usage</Typography>
            <CircularProgress variant="determinate" value={usedPercentage} size={100} />
            <Typography variant="body1">
            Remaining API Calls: {remaingApiCalls <=0 ?"Expired" :remaingApiCalls }
            </Typography>
            <Typography variant="body1">
              Total API Calls:{data?.data?.plan[0].apiLimit}
            </Typography>
          </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper sx={{ p: 2, backgroundColor: '#f0f0f0' }}>
          <Typography variant="h5" sx={{ marginBottom: 1 }}>Purchased Plans</Typography>
        
           
              <Typography variant="body1">{data?.data?.plan[0].name} - ${data?.data?.plan[0].price}</Typography>
            
          
        </Paper>
      </Grid>
    </Grid>
  </Box>
  );
};

export default Dashboard;
