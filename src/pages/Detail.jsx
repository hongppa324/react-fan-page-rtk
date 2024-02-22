import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import { toast } from "react-toastify";
import { logoutUser } from "../redux/modules/authSlice";
import authApi from "../axios/authApi";
import { getFormattedDate } from "../utils/date";
import {
  __deleteData,
  __getDetailData,
  __updateData,
} from "../redux/modules/commentSlice";

export default function Detail() {
  const { letter } = useSelector((state) => state.commentSlice);
  const { userId, accessToken } = useSelector((state) => state.authSlice);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const [textarea, setTextarea] = useState("");
  const navigate = useNavigate();

  const commentUpdateHandler = () => {
    if (textarea === letter?.content) {
      alert("수정사항이 없습니다.");
    } else {
      const result = window.confirm("이대로 수정하시겠습니까?");
      if (result) {
        dispatch(__updateData({ id, textarea }));
        navigate("/");
      }
    }
  };

  const commentDeleteHandler = () => {
    const result = window.confirm("정말 삭제하시겠습니까?");
    if (result) {
      dispatch(__deleteData(id));
      navigate("/");
    }
  };

  useEffect(() => {
    dispatch(__getDetailData(id));
  }, [dispatch, id]);

  const refreshToken = async () => {
    try {
      const response = await authApi.get("/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response);
    } catch (error) {
      console.log("error", error.response.data.message);
      toast.error(error.response.data.message);
      dispatch(logoutUser());
    }
  };
  refreshToken();

  return (
    <CommentBox>
      <StDiv>
        <StImage src={letter?.avatar} />
        <div>
          <p>{letter?.nickname}</p>
          <p>To. {letter?.writedTo}</p>
          <p>{getFormattedDate(letter?.createdAt)}</p>
        </div>
      </StDiv>

      {userId === letter?.userId ? (
        isInputDisabled ? (
          <>
            <CommentContent>{letter?.content}</CommentContent>
            <Buttons>
              <Button value="수정" onClick={() => isInputDisabled(false)} />
              <Button value="삭제" onClick={commentDeleteHandler} />
            </Buttons>
          </>
        ) : (
          <>
            <StTextarea
              type="text"
              defaultValue={letter.content}
              disabled={isInputDisabled}
              onChange={(event) => setTextarea(event.target.value)}
            />
            <Buttons>
              <Button value="수정완료" onClick={commentUpdateHandler} />
              <Button value="취소" onClick={() => setIsInputDisabled(true)} />
            </Buttons>
          </>
        )
      ) : (
        <CommentContent>{letter?.content}</CommentContent>
      )}
    </CommentBox>
  );
}

const CommentBox = styled.div``;
const StDiv = styled.div``;
const StImage = styled.image``;
const CommentContent = styled.div``;
const Buttons = styled.div``;
const StTextarea = styled.textarea``;
