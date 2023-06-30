import styled from "styled-components";
import Menu from "../menu/Menu";
import MenuNavigation from "../navigation/MenuNavigation";

const HeaderWrapper = styled.header`
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 2;
`;

function Header() {
  return (
    <HeaderWrapper>
      <Menu />
      <MenuNavigation />
    </HeaderWrapper>
  );
}

export default Header;
