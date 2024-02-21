import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getFormattedDate } from "../utils/date";
import defaultUser from "../assets/defaultUser.jpg";

export default function Comment({ comment }) {
  return (
    <Link to={`/detail/${comment.id}`}>
      <CommentBox>
        <StImg src={comment.avatar} alt={defaultUser} />
        <div>
          <StSpan>{comment.nickname}</StSpan>
          <p>{getFormattedDate(comment.createdAt)}</p>
          <p>
            {comment.content?.length > 40
              ? `${comment.content.slice(0, 40)}...`
              : comment.content}
          </p>
        </div>
      </CommentBox>
    </Link>
  );
}

const CommentBox = styled.div``;
const StImg = styled.img``;
const StSpan = styled.span``;
