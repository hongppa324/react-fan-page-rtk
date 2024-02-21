import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getFormattedDate } from "../utils/date";

export default function Comment() {
  return (
    <Link>
      <CommentBox>
        <StImg />
        <div>
          <StSpan></StSpan>
          <p></p>
          <p></p>
        </div>
      </CommentBox>
    </Link>
  );
}

const CommentBox = styled.div``;
const StImg = styled.img``;
const StSpan = styled.span``;
