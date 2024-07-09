import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export interface File {
  user:string;
  filename: string;
  filepath: string;
  isPublic: boolean;
}

interface FilesState {
  files: File[];
  loading: boolean;
  error: string | null;
}

    const token= localStorage.getItem('token');
export const fileApi=createApi({
    reducerPath:"fileApi",
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:5000/api'}),
    
    endpoints:(builder)=>({
          files:builder.query<FilesState,void>({
         query:()=>({
          url:'/users/file',
          headers: {
            'Authorization': `Bearer ${token}`
        }
         })
          }),
          selectedPlans:builder.mutation<FilesState,{planId:string}>({
            query:({planId})=>({
             url:`/users/plans/${planId}`,
             method:'POST',
             headers: {
               'Authorization': `Bearer ${token}`
           }
            })
             }),
          
          uploadFile:builder.mutation<FilesState,FormData>({
            query:(FormData)=>({
                url:'/users/uploadfile',
                method:'POST',
                body:FormData,
                headers: {
                  'Authorization': `Bearer ${token}`
              }

            })
          }),

      
    })
})

export const {
    useFilesQuery,
    useUploadFileMutation,
    useSelectedPlansMutation
}=fileApi;
// async onQueryStarted(arg, { dispatch, getState }) {
//     await refreshTokenIfNeeded(dispatch, getState);
// },  
// localStorage.setItem('profile', JSON.stringify({ ...action?.data }));