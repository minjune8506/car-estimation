import styled from "styled-components";
import Menu from "../menu/Menu";
import Navigation from "../menu/Navigation";

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
      <Navigation></Navigation>
    </HeaderWrapper>
  );
}

export default Header;
