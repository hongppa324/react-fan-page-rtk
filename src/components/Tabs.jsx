import React from "react";
import styled from "styled-components";
import Button from "./Button";

export default function Tabs({ member, setMember }) {
  return (
    <StDiv>
      <Button
        value="IU"
        onClick={() => setMember("IU")}
        clicked={(member === "IU").toString()}
      />
      <Button
        value="Full Moon Long"
        onClick={() => setMember("Full Moon Long")}
        clicked={(member === "Full Moon Long").toString()}
      />
      <Button
        value="Jian Lee"
        onClick={() => setMember("Jian Lee")}
        clicked={(member === "Jian Lee").toString()}
      />
      <Button
        value="Cindy"
        onClick={() => setMember("Cindy")}
        clicked={(member === "Cindy").toString()}
      />
      <Button
        value="Hae Su"
        onClick={() => setMember("Hae Su")}
        clicked={(member === "Hae Su").toString()}
      />
    </StDiv>
  );
}

const StDiv = styled.div``;
