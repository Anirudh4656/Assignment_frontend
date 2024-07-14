import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface File {
  pageNumber:number
}

interface FilesState {
  files: File[];
  loading: boolean;
  error: string | null;
  pageNumber:number
}

const initialState= {
  currentPage:1
};
const fileReducer = createSlice({
  name: "file",
  initialState,
  reducers: {
    changeCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});
export const {  changeCurrentPage } = fileReducer.actions;
export default fileReducer.reducer;
