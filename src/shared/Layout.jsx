import React from "react";
import styled from "styled-components";
import { Link, Outlet } from "react-router-dom";
import Button from "../components/Button";
import { useDispatch } from "react-redux";

export default function Layout() {
  const dispatch = useDispatch();
  return (
    <div>
      <StHeader>
        <Buttons>
          <Link>
            <Button />
          </Link>
        </Buttons>
      </StHeader>
      <StLayout>
        <Outlet />
      </StLayout>
      <StFooter>
        <span></span>
      </StFooter>
    </div>
  );
}

const StHeader = styled.header``;
const StFooter = styled.footer``;
const StLayout = styled.div``;
const Buttons = styled.div``;
