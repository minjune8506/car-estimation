import styled from "styled-components";
import { useRecoilState } from "recoil";
import ModelNavigation from "./ModelNavigation";
import { isMenuOpenState } from "../home/home_state";

const NavBarDiv = styled.div<{ isMenuOpen: boolean }>`
  display: ${(props) => (props.isMenuOpen ? "block" : "none")};
  background-color: #f6f3f2;
  position: relative;
  z-index: 5;
`;

function Navigation() {
  const [isMenuOpen, setMenuState] = useRecoilState(isMenuOpenState);

  return (
    <NavBarDiv isMenuOpen={isMenuOpen} onMouseLeave={() => setMenuState(false)}>
      {isMenuOpen && <ModelNavigation />}
    </NavBarDiv>
  );
}

export default Navigation;
