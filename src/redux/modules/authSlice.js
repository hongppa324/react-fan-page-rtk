import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // isLoggedIn: false,
  // accessToken: null,
  // avatar: null,
  // nickname: null,
  // userId: null,

  isLoggedIn: !!localStorage.getItem("accessToken"),
  avatar: localStorage.getItem("avatar"),
  nickname: localStorage.getItem("nickname"),
  userId: localStorage.getItem("userId"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const { accessToken, avatar, nickname, userId } = action.payload;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("avatar", avatar);
      localStorage.setItem("nickname", nickname);
      localStorage.setItem("userId", userId);
      state.isLoggedIn = true;
      state.accessToken = accessToken;
      state.avatar = avatar;
      state.nickname = nickname;
      state.userId = userId;
    },

    signupUser: (state, action) => {
      state.isLoggedIn = false;
    },

    logoutUser: (state, action) => {
      state.isLoggedIn = false;
      state.accessToken = "";
      state.avatar = "";
      state.nickname = "";
      state.userId = "";
      localStorage.clear();
    },

    editUser: (state, action) => {
      const { avatar, nickname } = action.payload;
      state.avatar = avatar;
      state.nickname = nickname;
    },
  },
});

export const { loginUser, signupUser, logoutUser, editUser } =
  authSlice.actions;
export default authSlice.reducer;
