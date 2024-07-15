import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../Store/store";
export interface File {
  user: string;
  filename: string;
  filepath: string;
  isPublic: boolean;
  data: any;
}

interface FilesState {
  files: File[];
  loading: boolean;
  error: string | null;
}
interface page{
pageNumber:number;
}
// const token = localStorage.getItem("token");
export const fileApi = createApi({
  reducerPath: "fileApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api",
    prepareHeaders: (headers, { getState }) => {
  const token = (getState() as RootState).auth.accessToken;
  console.log("token error",token); // Assuming you have an auth slice with a token in your Redux statee
  if (token) {
    console.log("token",token);
    headers.set('Authorization', `Bearer ${token}`);
  }
  return headers;
}
   }),  

  endpoints: (builder) => files: builder.query<FilesState, {currentPage: number}>({
      query: ({currentPage}) => ({
        url: `/users/file?page=${currentPage}`,
        providedtags: ["file"],
      }),
    }),
    privateFiles: builder.mutation<
      FilesState,
      { accessKey: string; id: string }
    >({
      query: ({ accessKey, id }) => ({
        url: "/users/keys",
        body: { accessKey, id },
        method: "POST"
      }),
    }),
    selectedPlans: builder.mutation<FilesState, { planId: string }>({
      query: ({ planId }) => ({
        url: `/users/plans/${planId}`,
        method: "POST"
      }),
    }),
    checkoutPlans: builder.mutation<FilesState, { paymentMethodId:string,planId:string }>({
      query: ({paymentMethodId,planId}) => ({
        url: '/users/create-payment-intent',
        method: "POST",
        body:{paymentMethodId,planId}
      }),
    }),

    uploadFile: builder.mutation<FilesState, FormData>({
      query: (FormData) => ({
        url: "/users/uploadfile",
        method: "POST",
        body:FormData,
        invalidateTags:['file']
      }),
    }),
  }),
});

export const {
  useFilesQuery,
  useUploadFileMutation,
  useSelectedPlansMutation,
  usePrivateFilesMutation,
  useCheckoutPlansMutation
} = fileApi;
// async onQueryStarted(arg, { dispatch, getState }) {
//     await refreshTokenIfNeeded(dispatch, getState);
// },
// localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
