import React from "react";
import Tabs from "../components/Tabs";
import AddForm from "../components/AddForm";
import styled from "styled-components";

export default function Home() {
  return (
    <>
      <Tabs />
      <AddForm />
      {isLoading ? <StDiv>로딩 중...</StDiv> : <div></div>}
    </>
  );
}

const StDiv = styled.div``;
