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

export const __getData = createAsyncThunk(
  "GET_DATA",
  async (payload, thunkAPI) => {
    try {
      const response = await jsonApi.get("/letters");
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const __getDetailData = createAsyncThunk(
  "GET_DETAIL_DATA",
  async (payload, thunkAPI) => {
    try {
      const response = await jsonApi.get(`/letters/${payload}`);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const __createData = createAsyncThunk(
  "CREATE_DATA",
  async (payload, thunkAPI) => {
    try {
      const response = await jsonApi.post("/letters", payload);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const __deleteData = createAsyncThunk(
  "DELETE_DATA",
  async (payload, thunkAPI) => {
    try {
      await jsonApi.delete(`/letters/${payload}`);
      thunkAPI.dispatch(__getData());
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const __updateData = createAsyncThunk(
  "UPDATE_DATA",
  async (payload, thunkAPI) => {
    try {
      await jsonApi.delete(`/letters/${payload.id}`, {
        content: payload.textarea,
      });
      thunkAPI.dispatch(__getData());
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const __updateUser = createAsyncThunk("UPDATE_USER", () => {});
export const __getUserLetters = createAsyncThunk("GET_USER_LETTERS", () => {});

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: {
    [__getDetailData.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__getDetailData.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.letter = action.payload;
    },
  },
});

export default commentSlice.reducer;
