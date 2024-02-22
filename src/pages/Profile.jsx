import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Button from "../components/Button";
import authApi from "../axios/authApi";
import { toast } from "react-toastify";
import { editUser, logoutUser } from "../redux/modules/authSlice";
import { __getUserLetters, __updateUser } from "../redux/modules/commentSlice";
import defaultUser from "../assets/defaultUser.jpg";

export default function Profile() {
  const { accessToken, avatar, nickname, userId } = useSelector(
    (state) => state.authSlice
  );
  const { userLetters } = useSelector((state) => state.commentSlice);
  const targetIds = userLetters.map((item) => item.id);
  const [isEditted, setIsEditted] = useState(false);
  const [modifiedNickname, setModifiedNickname] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [modifiedAvatar, setModifiedAvatar] = useState(avatar);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getUserLetters(userId));
  }, [dispatch, userId]);

  const avatarClickHandler = () => {
    if (isEditted) {
      document.getElementById("fileInput").click();
    }
  };

  const fileChangeHandler = (event) => {
    const selectedFile = event.target.files[0];
    const imageUrl = URL.createObjectURL(selectedFile);
    setImagePreview(imageUrl);
    setModifiedAvatar(selectedFile);
  };

  const isEditingDone = async () => {
    const formData = new FormData();
    formData.append("avatar", modifiedAvatar);
    formData.append("nickname", modifiedNickname);
    try {
      const { data } = await authApi.patch("/profile", formData, {
        headers: {
          "Content-Type": "form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("data", data);
      toast.success(data.message);

      const edittedNickname = data.nickname;
      const edittedAvatar = data.avatar;
      dispatch(
        editUser({
          nickname: edittedNickname || nickname,
          avatar: edittedAvatar || avatar,
        })
      );
      dispatch(
        __updateUser({
          targetIds,
          nickname: edittedNickname || nickname,
          avatar: edittedAvatar || avatar,
        })
      );
      setIsEditted(false);
    } catch (error) {
      console.log("error", error);
      toast.error(error.response.data.message);
    }
  };

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
    <>
      <ProfileBox>
        <h2>MY PROFILE</h2>
        <Avatar
          src={imagePreview || avatar || defaultUser}
          onClick={avatarClickHandler}
          isEditted={isEditted.toString()}
        />
        <input type="file" id="fileInput" onChange={fileChangeHandler} />
        {isEditted ? (
          <>
            <StInput
              defaultValue={nickname}
              onChange={(event) => setModifiedNickname(event.target.value)}
            />
            <div>{userId}</div>
            <Buttons>
              <Button value="취소" onClick={() => setIsEditted(false)} />
              <Button
                value="수정완료"
                onClick={isEditingDone}
                disabled={!modifiedNickname && modifiedAvatar === avatar}
              />
            </Buttons>
          </>
        ) : (
          <>
            <div>{nickname}</div>
            <div>{userId}</div>
            <Button value="수정" onClick={() => setIsEditted(true)} />
          </>
        )}
      </ProfileBox>
    </>
  );
}

const ProfileBox = styled.div``;
const Avatar = styled.img``;
const StInput = styled.input``;
const Buttons = styled.div``;
