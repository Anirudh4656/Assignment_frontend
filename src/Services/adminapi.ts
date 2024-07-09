import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
interface User {
    map(arg0: (getAllUser: User) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
    length: number;
    data: any;
    accessToken(accessToken: any): unknown;
    _id: string;
    user: string;
    email: string;
    password:string;
    username:string;
    isAdmin: boolean;
    blocked: boolean;
  }
 
  interface NewPlan {
    _id: string;
    name:string,
    price:number,
    apiLimit:number,
    storageLimit:number,
    domainLimit:number,
    apiLimitPerSecond:number
}
  interface BlockUserPayload {
    userId: string;
  }
  const token= localStorage.getItem('token');
export const adminApi=createApi({
    reducerPath:"adminApi",
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:5000/api/admin'}),
    endpoints:(builder)=>({
          Users:builder.query<User[],void>({
         query:()=>({
          url:'/users',
          headers: {
            'Authorization': `Bearer ${token}`
        }  })
          }) ,

          blockUser:builder.mutation<User,BlockUserPayload>({
            query:({userId})=>({
                  url:`/users/block/${userId}`,
                method: 'PATCH',
                headers: {
                  'Authorization': `Bearer ${token}`
              } 
            })
              
          }),
          deleteUser:builder.mutation<User,BlockUserPayload>({
            query:({userId})=>({
                  url:`/users/delete/${userId}`,
                method: 'DELETE',
                headers: {
                  'Authorization': `Bearer ${token}`
              } 
            })
              
          }),
          Plans:builder.mutation<User, NewPlan >({
            query:( NewPlan )=>({
                  url:`/create`,
                method: 'POST',
                body: NewPlan,
                headers: {
                  'Authorization': `Bearer ${token}`
              } 
            })
              
          }),
          getPlans:builder.query<NewPlan[],void>({
            query:()=>({
             url:'/Plans',
             headers: {
               'Authorization': `Bearer ${token}`
           }
            })
             }),
          close:builder.mutation<User,{id:string}>({
            query:({id})=>({
              url:`/discussions/close/${id}`,
            method: 'PATCH',
            headers: {
              'Authorization': `Bearer ${token}`
          } 
        })
          })
            
    })
})

export  const {  useGetPlansQuery,useUsersQuery,useBlockUserMutation,useDeleteUserMutation,useCloseMutation,usePlansMutation} = adminApi;