import type { User } from "types/user";
import { createApi } from "@reduxjs/toolkit/query/react";

import { userSlice } from "../reducers/user";
import baseQuery from "api";



export const userApi = createApi({
    reducerPath: "userApi",
    tagTypes: ["User"],
    baseQuery,
    endpoints: builder => ({
        getUser: builder.query<User, void | null>({
            query: () => "/660/user",
            providesTags: ["User"],
            async onQueryStarted(_args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(userSlice.actions.setUser(data));
                } catch (error) {
                    dispatch(userSlice.actions.logout());
                }
            },
        })
    })
});

export const { useGetUserQuery } = userApi;