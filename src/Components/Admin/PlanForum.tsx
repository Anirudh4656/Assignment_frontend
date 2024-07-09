
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React,{FormEvent, useState} from "react";
import { usePlansMutation } from "../../Services/adminapi";
import Layout from "../../Layout/AdminPanel";
interface NewPlan {
    name:string,
    price:number,
    apiLimit:number,
    storageLimit:number,
    domainLimit:number,
    apiLimitPerSecond:number,
    
}

const PlanForum:React.FC=()=>{
    const [Plans]=usePlansMutation();
    const initialState: NewPlan= {  name: '',
    price:0,
    apiLimit:0,
    storageLimit:0,
    domainLimit:0,
    apiLimitPerSecond:0
    };
    const [newPlan, setNewPlan] = useState<NewPlan>(initialState);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      
        

        setNewPlan({ ...newPlan, [event.target.name]: event.target.value });
    };
    const handleSubmit=async(e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const createPlans = await Plans(newPlan).unwrap();
        console.log("in createPlan",createPlans);
        setNewPlan(initialState);
        //dispatch
    }
    return(
        <>
        <Layout>
         <Grid container justifyContent="center">
            <Grid item xs={10} sm={8} md={6}>
                <Paper elevation={3} style={{ padding: 20 }}>
                    <Typography variant="h5" gutterBottom>
                        Create New Plan
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="Name"
                                    name="name"
                                    value={newPlan.name}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="Price"
                                    name="price"
                                    value={newPlan.price}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="API Limit"
                                    type="number"
                                    name="apiLimit"
                                    value={newPlan.apiLimit}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="Max Storage (GB)"
                                    type="number"
                                    name="storageLimit"
                                    value={newPlan.storageLimit}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="Domain Limit"
                                    type="number"
                                    name="domainLimit"
                                    value={newPlan.domainLimit}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="API Limit (calls/second)"
                                    type="number"
                                    name="apiLimitPerSecond"
                                    value={newPlan.apiLimitPerSecond}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary">
                                    Create Plan
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Grid>
        </Grid>
        </Layout>
        </>
    )

}

export default PlanForum;