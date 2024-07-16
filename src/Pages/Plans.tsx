import React from "react";
import {
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Modal,
  Fade,
  Backdrop,
} from "@mui/material";
import {
  useSelectedPlansMutation,
  useCheckoutPlansMutation,
} from "../Services/file";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useGetPlansQuery } from "../Services/adminapi";

interface NewPlan {
  _id: string;
  name: string;
  price: number;
  apiLimit: number;
  storageLimit: number;
  domainLimit: number;
  apiLimitPerSecond: number;
  data: any;
}

const stripePromise = loadStripe(
  "pk_test_51PcIxwJStpKXj5d4LG3Fy6GmUL0hTBzViCcTorpTsjq45wGMs5M4pYsuNK3tBrrBc9dllAMRAPwWLH9qtz66MxbB004JScm72a"
);

const CheckoutForm: React.FC<{
  planId: string;
  open: boolean;
  handleClose: () => void;
}> = ({ planId, open, handleClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [checkoutPlans] = useCheckoutPlansMutation();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      console.log("Card element not found.");
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      try {
        const response: any = await checkoutPlans({
          paymentMethodId: paymentMethod?.id,
          planId,
        });
        console.log("response", response);
        if (response.error) {
          console.log("[error]", response.error);
        } else {
          const clientSecret = response.data.data.clientSecret;

          const confirmed = await stripe.confirmCardPayment(clientSecret);
          console.log("client SEcret", confirmed);
          if (confirmed.paymentIntent?.status === "succeeded") {
            handleClose(); 
            navigate("/upload");
          } else {
            console.log("[error]", confirmed.error);
          }
        }
      } catch (error) {
        console.error("Error processing payment:", error);
      }
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            minWidth: 400,
            maxWidth: 600,
            borderRadius: 8,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Enter Card Details
          </Typography>
          <form onSubmit={handleSubmit}>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!stripe}
              sx={{ mt: 2 }}
            >
              Pay
            </Button>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

const Plans: React.FC = () => {
  const { data } = useGetPlansQuery();
  console.log("data",data);
  const [selectedPlan, setSelectedPlan] = React.useState<string | null>(null);
  const [selectedPlans] = useSelectedPlansMutation();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectPlan = async (planId: string, price: number) => {
    setSelectedPlan(planId);

    if (price > 0) {
      setOpen(true);
    } else {
      try {
        const result = await selectedPlans({ planId });
        if (result?.data?.statusCode === 200) {
          console.log("in selected Plan", 200);
          navigate("/upload");
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <Elements stripe={stripePromise}>
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
        <Typography variant="h4"  sx={{ marginBottom: 3, color: "#333" }}>Select a Plan</Typography>
        {data?.data?.map((plan: NewPlan) => (
          <Card key={plan._id}  sx={{
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
          }}>
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
              {plan.price > 0 ? (
                <>
                  <Button
                    variant="contained"
                    color={selectedPlan === plan._id ? "secondary" : "primary"}
                    onClick={() => handleSelectPlan(plan._id, plan.price)}
                  >
                    {selectedPlan === plan._id ? "Selected" : "Select"}
                  </Button>
                  <CheckoutForm
                    planId={plan._id}
                    open={open}
                    handleClose={handleClose}
                  />
                </>
              ) : (
                <Button
                  variant="contained"
                  color={selectedPlan === plan._id ? "secondary" : "primary"}
                  onClick={() => handleSelectPlan(plan._id, plan.price)}
                >
                  {selectedPlan === plan._id ? "Selected" : "Select"}
                </Button>
              )}
            </CardActions>
          </Card>
        ))}
      </Box>
    </Elements>
  );
};

export default Plans;
