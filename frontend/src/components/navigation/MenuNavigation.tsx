import styled from "styled-components";
import { useRecoilState } from "recoil";
import ModelNavigation from "./ModelNavigation";
import { IsMainMenuOpen } from "src/states/HomeState";

export default () => {
  const [isMenuOpen, setMenuState] = useRecoilState(IsMainMenuOpen);

  return (
    <NavBarDiv isMenuOpen={isMenuOpen} onMouseLeave={() => setMenuState(false)}>
      {isMenuOpen && <ModelNavigation />}
    </NavBarDiv>
  );
};

const NavBarDiv = styled.div<{ isMenuOpen: boolean }>`
  display: ${(props) => (props.isMenuOpen ? "block" : "none")};
  background-color: #f6f3f2;
  position: relative;
  z-index: 5;
`;
