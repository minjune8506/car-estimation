import { useState } from "react";
import styled from "styled-components";
import NavBar from "./navigation/NavBar";
import HyundaiLogo from "../assets/logo/logo_main.svg";

const Logo = styled.div`
  margin-left: 1rem;
  margin-right: 10%;
  cursor: pointer;
`;

const MenuItems = styled.a<{ isMenuOpen: boolean }>`
  font-size: 0.8rem;
  border-bottom: ${(props) => (props.isMenuOpen ? "2px solid #007FA8" : "")};
  padding: 1rem;
`;

const MenuDiv = styled.div<{ isMenuOpen?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => (props.isMenuOpen ? "white" : "")};
`;

const HeaderWrapper = styled.header`
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 2;
`;

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <HeaderWrapper>
      <MenuDiv isMenuOpen={isMenuOpen}>
        <Logo>
          <img src={HyundaiLogo} alt="현대차 로고"></img>
        </Logo>
        <MenuItems onMouseOver={openMenu} isMenuOpen={isMenuOpen}>
          <div style={{ cursor: "pointer" }}>모델</div>
        </MenuItems>
      </MenuDiv>
      <NavBar isMenuOpen={isMenuOpen} closeMenu={closeMenu}></NavBar>
    </HeaderWrapper>
  );
}

export default Header;
