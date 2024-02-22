import React, { useState } from "react";
import Button from "../components/Button";
import styled from "styled-components";
import authApi from "../axios/authApi";
import { useDispatch } from "react-redux";
import { loginUser, signupUser } from "../redux/modules/authSlice";
import { toast } from "react-toastify";

export default function Login() {
  const [formState, setFormState] = useState({
    id: "",
    password: "",
    nickname: "",
    joinId: "",
    joinPassword: "",
  });
  const { id, password, nickname, joinId, joinPassword } = formState;

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const dispatch = useDispatch();
  let isLoginButtonActive = false;

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  if (isLoggedIn) {
    isLoginButtonActive = id !== "" && password !== "";
  } else {
    isLoginButtonActive =
      joinId !== "" && joinPassword !== "" && nickname !== "";
  }

  const signInHandler = async (event) => {
    event.preventDefault();
    const signInData = {
      id,
      password,
    };

    try {
      const { data } = await authApi.post("/login", signInData);
      const { accessToken, avatar, nickname, userId } = data;
      dispatch(loginUser({ accessToken, avatar, nickname, userId }));
      toast.success("로그인 성공");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const signUpHandler = async (event) => {
    event.preventDefault();
    const signUpData = {
      id: joinId,
      password,
      joinPassword,
      nickname,
    };

    try {
      const response = await authApi.post("/register", signUpData);
      console.log(response.data);
      dispatch(signupUser());
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <Container>
      {isLoggedIn ? (
        <StForm onSubmit={signInHandler}>
          <h2>로그인</h2>
          <input
            type="text"
            value={id}
            name="id"
            onChange={inputChangeHandler}
            required
            placeholder="아이디 (4 ~ 10글자)"
            minLength={4}
            maxLength={10}
          />
          <input
            type="password"
            value={password}
            name="password"
            onChange={inputChangeHandler}
            required
            placeholder="비밀번호 (4 ~ 15글자)"
            minLength={4}
            maxLength={15}
          />
          <Buttons>
            <Button value="로그인" disabled={!isLoginButtonActive} />
            <StSpan onClick={() => setIsLoggedIn(false)}>회원가입</StSpan>
          </Buttons>
        </StForm>
      ) : (
        <StForm onSubmit={signUpHandler}>
          <h2>회원가입</h2>
          <input
            type="text"
            value={joinId}
            name="joinId"
            onChange={inputChangeHandler}
            required
            placeholder="아이디 (4 ~ 10글자)"
            minLength={4}
            maxLength={10}
          />
          <input
            type="password"
            value={joinPassword}
            name="joinPassword"
            onChange={inputChangeHandler}
            required
            placeholder="비밀번호 (4 ~ 15글자)"
            minLength={4}
            maxLength={15}
          />
          <input
            type="text"
            value={nickname}
            name="nickname"
            onChange={inputChangeHandler}
            required
            placeholder="닉네임 (1 ~ 10글자)"
            minLength={1}
            maxLength={10}
          />
          <Buttons>
            <Button value="회원가입" disabled={!isLoginButtonActive} />
            <StSpan onClick={() => setIsLoggedIn(true)}>로그인</StSpan>
          </Buttons>
        </StForm>
      )}
    </Container>
  );
}

const Container = styled.div``;
const StForm = styled.form``;
const Buttons = styled.div``;
const StSpan = styled.span`
  color: lightgray;
  user-select: none;
  cursor: pointer;
  &:hover {
    color: black;
  }
`;
