import { useRecoilState } from "recoil";
import HyundaiLogo from "../../assets/logo/logo_main.svg";

import styled from "styled-components";
import { isMenuOpenState } from "../home/home_state";

const MenuDiv = styled.div<{ isMenuOpen: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => (props.isMenuOpen ? "white" : "")};
`;

const Logo = styled.div`
  margin: 1rem;
  cursor: pointer;
`;

const MenuItems = styled.ul`
  margin-left: 10%;
`;

const MenuItem = styled.li<{ isMenuOpen: boolean }>`
  font-size: 0.8rem;
  border-bottom: ${(props) => (props.isMenuOpen ? "2px solid #007FA8" : "")};
  padding: 1rem;
  cursor: pointer;
`;

function Menu() {
  const [isMenuOpen, setMenuState] = useRecoilState(isMenuOpenState);

  return (
    <MenuDiv isMenuOpen={isMenuOpen}>
      <Logo>
        <img src={HyundaiLogo} alt="현대차 로고"></img>
      </Logo>
      <MenuItems>
        <MenuItem
          onMouseOver={() => setMenuState(true)}
          isMenuOpen={isMenuOpen}
        >
          <div>모델</div>
        </MenuItem>
      </MenuItems>
    </MenuDiv>
  );
}

export default Menu;
