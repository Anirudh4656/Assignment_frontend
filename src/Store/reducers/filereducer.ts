import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";

export interface File {
  _id: string;
  filename: string;
  url: string;
  isPublic: boolean;
}

interface FilesState {
  files: File[];
  loading: boolean;
  error: string | null;
}

const initialState: FilesState = {
  files: [],
  loading: false,
  error: null,
};
const fileReducer=createSlice({
    name:'file',
    initialState,
    reducers:{
      fetchFiles:(
        state,
        action:PayloadAction<{FilesState:FilesState[]}>
        )=>{
            // const { discussions} = action.payload;      
   
        },
   uploadFiles:(
            state,
            action:PayloadAction<FilesState[]>
        )=>{
     

        },
    
    }
})
export const { fetchFiles, uploadFiles, } = fileReducer.actions;
export default fileReducer.reducer;