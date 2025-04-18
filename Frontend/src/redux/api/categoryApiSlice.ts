import { apiSlice } from "./apiSlice";
import { CATEGORY_URL } from "../constants";

export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCategory: builder.mutation({
            query: (newCategory) => ({
                url: `${CATEGORY_URL}`,
                method: 'POST',
                body: newCategory,
            }),
        }),
        updateCategory: builder.mutation({
            query: ({Id,updatedCategory}) => ({
                url: `${CATEGORY_URL}/${Id}`,
                method: 'PUT',
                body: updatedCategory
            })
        }),
        deleteCategory: builder.mutation({
            query: ({Id}) => ({
                url: `${CATEGORY_URL}/${Id}`,
                method: 'DELETE'
            })
        }),
        fetchCategories: builder.query({
            query: () => ({
                url: `${CATEGORY_URL}/categories`,
                method: 'GET'
            })
        })
    })

});

export const {
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useFetchCategoriesQuery,
} = categoryApiSlice