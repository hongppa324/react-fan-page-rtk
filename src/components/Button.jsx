import React from "react";
import styled, { css } from "styled-components";

export default function Button({
  value,
  text,
  size = "small",
  disabled = false,
  onClick = () => {},
}) {
  return (
    <StButton size={size} onClick={onClick} disabled={disabled}>
      <button onClick={onClick} disabled={disabled}>
        {value}
      </button>
    </StButton>
  );
}

const StButton = styled.div`
  /* background-color: black;
  color: white; */

  & button {
    ${(props) => {
      if (props.disabled) {
        return css`
          background-color: lightgray;
          color: white;
        `;
      }
      return css`
        background-color: black;
        color: white;
      `;
    }}
  }

  &:hover {
    cursor: default;
    filter: none;
  }
`;
