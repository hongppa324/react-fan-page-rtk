import React from "react";
import styled from "styled-components";
import { Link, Outlet } from "react-router-dom";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/modules/authSlice";

export default function Layout() {
  const dispatch = useDispatch();
  return (
    <div>
      <StHeader>
        <Link to="/">
          <StSpan>IU Metaverse</StSpan>
        </Link>
        <Buttons>
          <Link to="/profile">
            <Button value="MY PROFILE" />
          </Link>
          <Button value="LOGOUT" onClick={() => dispatch(logoutUser())} />
        </Buttons>
      </StHeader>
      <StLayout>
        <Outlet />
      </StLayout>
      <StFooter>
        <span>Copyright 2024. Peter Hong. All rights reserved.</span>
      </StFooter>
    </div>
  );
}

const StHeader = styled.header``;
const StSpan = styled.span``;
const StLayout = styled.div``;
const Buttons = styled.div``;
const StFooter = styled.footer``;
