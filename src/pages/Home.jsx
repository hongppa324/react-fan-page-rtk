import React, { useEffect, useState } from "react";
import Tabs from "../components/Tabs";
import AddForm from "../components/AddForm";
import Comment from "../components/Comment";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import authApi from "../axios/authAPi";
import { logoutUser } from "../redux/modules/authSlice";
import { __getData } from "../redux/modules/commentSlice";

export default function Home() {
  const { letters, isLoading, error } = useSelector(
    (state) => state.commentSlice
  );
  const { accessToken } = useSelector((state) => state.authSlice);
  const [member, setMember] = useState("IU");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getData());
  }, [dispatch]);

  const refreshToken = async () => {
    try {
      const response = await authApi.get("/user", {
        headers: {
          "Content-Type": "application/json",
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

  if (error) {
    return <StDiv>{error.message}</StDiv>;
  }

  return (
    <>
      <Tabs member={member} setMember={setMember} />
      <AddForm setMember={setMember} />
      {isLoading ? (
        <StDiv>로딩 중...</StDiv>
      ) : (
        <div>
          {letters
            ?.filter((comment) => comment.writedTo === member)
            .map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          {letters?.filter((comment) => comment.writedTo === member).length ===
          0 ? (
            <StDiv>
              {member}에게 첫번째 메시지를 남기는 주인공이 되어주세요!
            </StDiv>
          ) : null}
        </div>
      )}
    </>
  );
}

const StDiv = styled.div``;
