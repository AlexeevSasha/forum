import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {LOADING_STATUS} from "../types";
import {addNewCommentsThunk, getCommentsIdThunk} from "./commentsAction";
import {IComments} from "../../api/comments/commentsDto";





interface ICommentsState {
    postComments: IComments[] |  null,
    status: LOADING_STATUS,
    error: undefined | string
}
const initialState: ICommentsState = {
    postComments: null,
    status: LOADING_STATUS.NEVER,
    error: undefined
}

export const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
     //getCommentsId
        builder.addCase(getCommentsIdThunk.pending, (state) => {
            state.error = undefined;
            state.status = LOADING_STATUS.LOADING
            state.postComments = null;
        });
        builder.addCase(getCommentsIdThunk.fulfilled, (state, action) => {
            state.status = action.payload[0] ? LOADING_STATUS.LOADED : LOADING_STATUS.EMPTY;
            state.postComments = action.payload;
        });
        builder.addCase(getCommentsIdThunk.rejected, (state, action) => {
            state.status = LOADING_STATUS.ERROR
            state.error = action.error.message;
        });
        //addNewComments
        builder.addCase(addNewCommentsThunk.pending, (state) => {
            state.error = undefined;
            state.status = LOADING_STATUS.LOADING
        });
        builder.addCase(addNewCommentsThunk.fulfilled, (state, action : PayloadAction<IComments> ) => {
            state.status = LOADING_STATUS.LOADED;
            state.postComments = state.postComments === null ? [action.payload] : state.postComments.concat([action.payload]);
        });
        builder.addCase(addNewCommentsThunk.rejected, (state, action) => {
            state.status = LOADING_STATUS.ERROR
            state.error = action.error.message;
        });
    }
})

export default commentsSlice.reducer