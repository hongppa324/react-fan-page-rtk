import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jsonApi from "../../axios/jsonApi";

const initialState = {
  letters: [{}],
  letter: null,
  userLetters: [{}],
  isLoading: false,
  isError: false,
  error: null,
};

export const __getData = createAsyncThunk("GET_DATA", () => {});
export const __getDetailData = createAsyncThunk("GET_DETAIL_DATA", () => {});
export const __createData = createAsyncThunk("CREATE_DATA", () => {});
export const __deleteData = createAsyncThunk("DELETE_DATA", () => {});
export const __updateData = createAsyncThunk("UPDATE_DATA", () => {});
export const __updateUser = createAsyncThunk("UPDATE_USER", () => {});

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: {},
});

export default commentSlice.reducer;
