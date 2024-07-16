import React from "react";
import { Button, Box } from "@mui/material";
import { changeCurrentPage } from "../../Store/reducers/filereducer";
import { AppDispatch } from "../../Store/store";
import { useDispatch } from "react-redux";
const PaginationComponent: React.FC<{
  currentPage: number;
  totalPages: number;
}> = ({ currentPage, totalPages }) => {
  const dispatch: AppDispatch = useDispatch();
  const changeCurrentPageNumberInc = (currentPage: number) => {
    console.log("in current page", currentPage, totalPages);
    if (Number(currentPage) < Number(totalPages)) {
      dispatch(changeCurrentPage(currentPage + 1));
    } else if (Number(currentPage) === Number(totalPages)) {
      alert("cannot increase more");
    }
  };
  const changeCurrentPageNumberDec = (currentPage: number) => {
    if (Number(currentPage) === 1) {
      alert("cannot go back its page 1");
    } else {
      dispatch(changeCurrentPage(currentPage - 1));
    }
  };
  return (
    <Box
      sx={{
        mx: "auto",
        display: "flex",
        px: 2,
        textAlign: "center",
        alignItems: "center",
        mt: 8,
        mb: 4,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "grey.200",
        width: "20%",
      }}
    >
      <Button
        variant="contained"
        color="primary"
        disabled={Number(currentPage) === 1}
        onClick={() => changeCurrentPageNumberDec(currentPage)}
        sx={{
          mx: 2,
          boxShadow: 3,
          bgcolor: "white",
          color: "black",
          "&:disabled": {
            bgcolor: "grey.200",
          },
        }}
      >
        Prev
      </Button>
      <Button
        variant="contained"
        color="primary"
        disabled={Number(totalPages) === Number(currentPage)}
        onClick={() => changeCurrentPageNumberInc(currentPage)}
        sx={{
          mx: 2,
          boxShadow: 3,
          bgcolor: "white",
          color: "black",
          "&:disabled": {
            bgcolor: "grey.200",
          },
        }}
      >
        Next
      </Button>
    </Box>
  );
};

export default PaginationComponent;
