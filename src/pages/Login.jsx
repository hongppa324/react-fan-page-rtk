import React, { useState } from "react";
import Button from "../components/Button";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [joinId, setJoinId] = useState("");
  const [joinPassword, setJoinPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const dispatch = useDispatch();
  let isLoginButtonActive = false;

  return (
    <Container>
      {isLoggedIn ? (
        <StForm>
          <h2>로그인</h2>
          <input />
          <input />
          <Buttons>
            <Button />
            <StSpan>회원가입</StSpan>
          </Buttons>
        </StForm>
      ) : (
        <StForm>
          <h2>회원가입</h2>
          <input />
          <input />
          <input />
          <Buttons>
            <Button />
            <StSpan>로그인</StSpan>
          </Buttons>
        </StForm>
      )}
    </Container>
  );
}

const Container = styled.div``;
const StForm = styled.form``;
const Buttons = styled.div``;
const StSpan = styled.span``;
