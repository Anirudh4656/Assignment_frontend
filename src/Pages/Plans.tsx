import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { useGetPlansQuery } from "../Services/adminapi";
import { useSelectedPlansMutation } from "../Services/file";
import { useNavigate } from "react-router-dom";

interface NewPlan {
  name: string;
  price: number;
  apiLimit: number;
  storageLimit: number;
  domainLimit: number;
  apiLimitPerSecond: number;
  data: any;
}

const Plans: React.FC = () => {
  const { data } = useGetPlansQuery();
  const [selectedPlan] = useSelectedPlansMutation();
  const [selected, setSelected] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSelectPlan = async (planId: string) => {
    setSelected(planId);

    try {
      const result = await selectedPlan({ planId });
      console.log("in selected Plan", result);
      if (result?.data?.statusCode === 200) {
        console.log("in selected Plan", 200);
        navigate("/upload");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box
      sx={{
        padding: 3,
        backgroundColor: "#f5f5f5",
        borderRadius: 2,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 3, color: "#333" }}>
        Select a Plan
      </Typography>
      {data?.data?.map((plan: any) => (
        <Card
          key={plan._id}
          sx={{
            marginBottom: 3,
            backgroundColor: "#ffffff",
            borderRadius: 2,
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            width: {
              xs: '100%', // Full width on extra small screens
              sm: '80%', // 80% width on small screens
              md: '60%', // 60% width on medium screens
              lg: '50%', // 50% width on large screens
              xl: '40%', // 40% width on extra large screens
            }
          }}
        >
          <CardContent>
            <Typography variant="h5" sx={{ color: "#333" }}>
              {plan.name}
            </Typography>
            <Typography sx={{ color: "#555" }}>Price: ${plan.price}</Typography>
            <Typography sx={{ color: "#555" }}>API Limit: {plan.apiLimit}</Typography>
            <Typography sx={{ color: "#555" }}>Storage Limit: {plan.storageLimit} GB</Typography>
            <Typography sx={{ color: "#555" }}>Domain Limit: {plan.domainLimit}</Typography>
            <Typography sx={{ color: "#555" }}>API Limit Per Second: {plan.apiLimitPerSecond}</Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color={selected === plan._id ? "secondary" : "primary"}
              onClick={() => handleSelectPlan(plan._id)}
              sx={{ textTransform: "none" }}
            >
              {selected === plan._id ? "Selected" : "Select"}
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default Plans;
