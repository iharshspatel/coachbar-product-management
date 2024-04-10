import { apiSlice } from './apiSlice';
const USERS_URL = '/api/product';

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/create`,
        method: 'POST',
        body: data,
      }),
    }),

    getAllProducts: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/all`,
        method: 'GET',
      }),
    }),

    getProduct: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data}`,
        method: 'GET',
      }),
    }),

    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.id}`,
        method: 'PUT',
        body: data,
      }),
    }),

    deleteProduct: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data}`,
        method: 'DELETE',
        body: data,
      }),
    }),

  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductsMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetProductMutation
} = productApiSlice;
