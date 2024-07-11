import React,  { useEffect, useState } from "react";
import { Button, Typography, Box, Card, CardContent, CardActions } from '@mui/material';
import { useGetPlansQuery } from "../Services/adminapi";
import { useSelectedPlansMutation} from "../Services/file"
import { Navigate, useNavigate } from "react-router-dom";
interface NewPlan {
    name:string,
    price:number,
    apiLimit:number,
    storageLimit:number,
    domainLimit:number,
    apiLimitPerSecond:number,
    data:any
}
const Plans:React.FC=()=>{
    const {data}=useGetPlansQuery();
    const [selectedPlan]= useSelectedPlansMutation();
    const [plans, setPlans] = useState<NewPlan[]>([]);
    const [selected, setSelected] = useState<string | null>(null);
    const navigate = useNavigate();
    const handleSelectPlan = async(planId: string) => {
        setSelected(planId);
       
        //try
        try{
          const result =await selectedPlan({planId});
          console.log("in selected Plan",result);
            navigate("/upload");
        
        }catch(e){
          console.log(e);
        }
       
      };


    console.log("in getPlans section");

    // const set=async()=>{
    //         try{
    //             if(data) {
           
    //                 setPlans(data as NewPlan[]);
    //                 console.log("in Plans section",plans);
                   
    //               }

    //         }catch(e){
    //   console.log(e);
    //         }
    //     }
    //    set();
       
    //   },[data]);
return(
    <>
 <Box>
      <Typography variant="h4">Select a Plan</Typography>
      {data?.data?.map((plan:any) => (
        <Card key={plan._id} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h5">{plan.name}</Typography>
            <Typography>Price: ${plan.price}</Typography>
            <Typography>API Limit: {plan.apiLimit}</Typography>
            <Typography>Storage Limit: {plan.storageLimit} GB</Typography>
            <Typography>Domain Limit: {plan.domainLimit}</Typography>
            <Typography>API Limit Per Second: {plan.apiLimitPerSecond}</Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color={selected === plan._id ? 'secondary' : 'primary'}
              onClick={() => handleSelectPlan(plan._id)}
            >
              {selectedPlan === plan._id ? 'Selected' : 'Select'}
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
    </>
)


}
export default Plans;