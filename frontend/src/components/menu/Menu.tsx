import { useRecoilValue } from "recoil";
import HyundaiLogo from "/images/logo/logo_main.svg";
import styled from "styled-components";
import MenuItems from "./MenuItems";
import { IsMainMenuOpen } from "src/states/HomeState";

function Menu() {
  const isMenuOpen = useRecoilValue(IsMainMenuOpen);

  return (
    <MenuDiv isMenuOpen={isMenuOpen}>
      <Logo>
        <img src={HyundaiLogo} alt="현대차 로고"></img>
      </Logo>
      <MenuItems />
    </MenuDiv>
  );
}

export default Menu;

const MenuDiv = styled.div<{ isMenuOpen?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => props.isMenuOpen && "white"};
`;

const Logo = styled.div`
  margin: 1rem;
  cursor: pointer;
`;
