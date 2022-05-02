import { createSlice } from '@reduxjs/toolkit'
import {IUser} from "../../api/auth/authDto";
import {LOADING_STATUS} from "../types";
import {loginThunk, registerThunk, profileUpdateThunk} from "./authAction";
import {defaultAvatar} from "../../hooks/GeneratorAvatar";

interface IAuth {
    user: IUser | null;
    status: LOADING_STATUS;
    error: string | undefined
}
const initialState: IAuth = {
    user: JSON.parse(`${localStorage.getItem("user")}`) || null,
    status: LOADING_STATUS.NEVER,
    error: undefined
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signOut(state): void {
            localStorage.removeItem("user");
            state.user = null;
            state.status = LOADING_STATUS.NEVER
        },
        removeError: (state): void => {
            state.error = undefined;
        }
    },
    extraReducers: (builder) => {
        //singIn
        builder.addCase(loginThunk.pending, (state) => {
            state.error = undefined;
            state.status = LOADING_STATUS.LOADING
        });
        builder.addCase(loginThunk.fulfilled, (state, action) => {
            state.status = LOADING_STATUS.LOADED
            state.user = action.payload;
        });
        builder.addCase(loginThunk.rejected, (state, action) => {
            state.status = LOADING_STATUS.ERROR
            state.error = action.error.message;
        });
        //singUp
        builder.addCase(registerThunk.pending, (state) => {
            state.error = undefined;
            state.status = LOADING_STATUS.LOADING
        });
        builder.addCase(registerThunk.fulfilled, (state, action) => {
            state.status = LOADING_STATUS.LOADED
            state.user = action.payload;
        });
        builder.addCase(registerThunk.rejected, (state, action) => {
            state.status = LOADING_STATUS.ERROR
            state.error = action.error.message;
        });

        //update
        builder.addCase(profileUpdateThunk.pending, (state) => {
            state.error = undefined;
            state.status = LOADING_STATUS.LOADING;
        });
        builder.addCase(profileUpdateThunk.fulfilled, (state, {payload}) => {
            state.status = LOADING_STATUS.LOADED;
            const upDateUser = {userName: payload.userName, avatarUrl: payload.avatarUrl || defaultAvatar(), id:payload.id}
            localStorage.setItem("user", JSON.stringify(upDateUser));
            state.user = payload;
        });
        builder.addCase(profileUpdateThunk.rejected, (state, action) => {
            state.status = LOADING_STATUS.ERROR;
            state.error = action.error.message;
        });
    }
})
export const { signOut, removeError } = authSlice.actions;
export default authSlice.reducer