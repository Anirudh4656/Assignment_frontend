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
  statusCode?: number;
  data?: any;
}

export const fileApi = createApi({
  reducerPath: "fileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      console.log("token error", token); // Assuming you have an auth slice with a token in your Redux statee
      if (token) {
        console.log("token", token);
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    files: builder.query<FilesState, {currentPage: number}>({
      query: ({currentPage}) => ({
        url: `/users/file?page=${currentPage}`,
        providedtags: ["file"],
      }),
    }),
    privateFiles: builder.mutation<
      FilesState,{ id: string }
    >({
      query: ({  id }) => ({
        url: `/users/keys/${id}`,
        method: "POST",
      }),
    }),
    
    downloadFiles: builder.query<FilesState, { id: string }>({
      query: ({ id }) => ({
        url: `/users/file/download/${id}`,

      }),
    }),
    csvExport: builder.query<void, string>({ // Adjust response type if necessary
      query: (id) =>`/users/file/download/${id}`, // Endpoint path with id parameter
    }),
    selectedPlans: builder.mutation<FilesState, { planId: string }>({
      query: ({ planId }) => ({
        url: `/users/plans/${planId}`,
        method: "POST",
      }),
    }),
    checkoutPlans: builder.mutation<
      FilesState,
      { paymentMethodId: string; planId: string }
    >({
      query: ({ paymentMethodId, planId }) => ({
        url: "/users/create-payment-intent",
        method: "POST",
        body: { paymentMethodId, planId },
      }),
    }),

    uploadFile: builder.mutation<FilesState, FormData>({
      query: (FormData) => ({
        url: "/users/uploadfile",
        method: "POST",
        body: FormData,
        invalidateTags: ["file"],
      }),
    }),
  }),
});

export const {
  useFilesQuery,
  useUploadFileMutation,
  useDownloadFilesQuery,
  useSelectedPlansMutation,
  usePrivateFilesMutation,
  useLazyCsvExportQuery,
  useCheckoutPlansMutation,
} = fileApi;

