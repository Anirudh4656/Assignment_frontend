import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../Store/store";
interface User {
  map(
    arg0: (getAllUser: User) => import("react/jsx-runtime").JSX.Element
  ): import("react").ReactNode;
  length: number;
  data: any;
  accessToken: string;
  _id: string;
  user: string;
  email: string;
  id?:string;
  password: string;
  username: string;
  role:string;
  isAdmin: boolean;
  blocked: boolean;
}

interface NewPlan {
  _id: string;
  name: string;
  price: number;
  apiLimit: number;
  storageLimit: number;
  domainLimit: number;
  apiLimitPerSecond: number;
}
interface BlockUserPayload {
  userId: string;
}

// const token= localStorage.getItem('token');
export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/admin",
    prepareHeaders: (headers, { getState }) => {
      const token =
        (getState() as RootState).auth.accessToken ||
        localStorage.getItem("token"); // Assuming you have an auth slice with a token in your Redux statee
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    Users: builder.query<User[], void>({
      query: () => ({
        url: "/users",
      }),
    }),
    User: builder.query<User, {id:string}>({
      query: ({id}) => ({
        url: `/user/${id}`,
      }),
    }),


    blockUser: builder.mutation<User, BlockUserPayload>({
      query: ({ userId }) => ({
        url: `/users/block/${userId}`,
        method: "PATCH",
      }),
    }),
    deleteUser: builder.mutation<User, BlockUserPayload>({
      query: ({ userId }) => ({
        url: `/users/delete/${userId}`,
        method: "DELETE",
      }),
    }),
    Plans: builder.mutation<User, NewPlan>({
      query: (NewPlan) => ({
        url: `/create`,
        method: "POST",
        body: NewPlan,
      }),
    }),
    getPlans: builder.query<NewPlan[], void>({
      query: () => ({
        url: "/Plans",
      }),
    }),
    close: builder.mutation<User, { id: string }>({
      query: ({ id }) => ({
        url: `/discussions/close/${id}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useGetPlansQuery,
  useUsersQuery,
  useUserQuery,
  useBlockUserMutation,
  useDeleteUserMutation,
  useCloseMutation,
  usePlansMutation,
} = adminApi;
