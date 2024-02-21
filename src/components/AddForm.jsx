import React, { useRef, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import Button from "./Button";
import defaultUser from "../assets/defaultUser.png";
import { useDispatch } from "react-redux";

export default function AddForm() {
  const [content, setContent] = useState("");
  const id = uuidv4();
  const selectRef = useRef();
  const dispatch = useDispatch();

  return (
    <StForm>
      <StDiv>
        <label>nickname</label>
        {/* <p>{nickname}</p> */}
        <label>content</label>
        <StTextarea />
      </StDiv>
      <label>누구에게 보내시겠어요?</label>
      <StSelect>
        <option>IU</option>
        <option>Full Moon Long</option>
        <option>Jian Lee</option>
        <option>Cindy</option>
        <option>Hae Su</option>
      </StSelect>
      <Button />
    </StForm>
  );
}

const StForm = styled.form``;
const StDiv = styled.div``;
const StTextarea = styled.textarea``;
const StSelect = styled.select``;
