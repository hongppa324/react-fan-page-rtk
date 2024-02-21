import React, { useRef, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import Button from "./Button";
import defaultUser from "../assets/defaultUser.png";
import { useDispatch, useSelector } from "react-redux";
import { __createData } from "../redux/modules/commentSlice";

export default function AddForm({ setMember }) {
  const [content, setContent] = useState("");
  const id = uuidv4();
  const selectRef = useRef();
  const dispatch = useDispatch();
  const { avatar, nickname, userId } = useSelector((state) => state.authSlice);

  const selectMember = () => {
    const selectedMember = selectRef.current.value;
    setMember(selectRef.current.value);
    return selectedMember;
  };

  const createComment = (event) => {
    event.preventDefault();
    const commentContent = {
      createdAt: Date.now(),
      nickname,
      avatar: avatar ?? defaultUser,
      content,
      writedTo: selectMember(commentContent),
      id,
      userId,
    };
    dispatch(__createData(commentContent));

    setContent("");
  };

  return (
    <StForm onSubmit={createComment}>
      <StDiv>
        <label>nickname</label>
        <p>{nickname}</p>
        <label>content</label>
        <StTextarea
          id="content"
          type="text"
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          required
          maxLength={100}
        />
      </StDiv>
      <label>누구에게 보내시겠어요?</label>
      <StSelect id="select" onChange={selectMember} ref={selectRef}>
        <option>IU</option>
        <option>Full Moon Long</option>
        <option>Jian Lee</option>
        <option>Cindy</option>
        <option>Hae Su</option>
      </StSelect>
      <Button value="Submit" />
    </StForm>
  );
}

const StForm = styled.form``;
const StDiv = styled.div``;
const StTextarea = styled.textarea``;
const StSelect = styled.select``;
