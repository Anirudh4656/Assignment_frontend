import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
interface User {
    email: string;
    user:string;
    password:string;
 
  }
interface AuthState{
    user:User | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;

}
const initialState:AuthState={
    user:null,
    loading: false,
    error: null,
    isAuthenticated: false,
}

 const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
    setUser:(
        state,
        action:PayloadAction<User>
    )=>{
        state.user=action.payload;
        state.loading=false;
        state.error=null;
        state.isAuthenticated=true;
    },
    setLoading:(
        state,
        action:PayloadAction<boolean>
    )=>{
        state.loading=action.payload
    },
    setError:(
        state,
        action:PayloadAction<string|null>
    )=>{
        state.error=action.payload;
        state.loading=false;
    },
}})

export const { setUser, setLoading,setError } = authSlice.actions;
    
//action creators
export default authSlice.reducer;