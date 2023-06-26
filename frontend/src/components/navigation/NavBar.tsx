import styled from "styled-components";
import Category from "./Category";
import NavItems from "./NavItems";
import { CategoryInfo } from "./types";
import { useRecoilState } from "recoil";
import { headerMenuState } from "../home/home_state";

const NavBarDiv = styled.div<{ isMenuOpen?: boolean }>`
  display: ${(props) => (props.isMenuOpen ? "flex" : "none")};
  background-color: #f6f3f2;
  height: 30rem;
  position: relative;
  z-index: 5;
`;

interface NavBarProps {
  categories: CategoryInfo[];
}

function NavBar({ categories }: NavBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useRecoilState(headerMenuState);

  return (
    <NavBarDiv
      isMenuOpen={isMenuOpen}
      onMouseLeave={() => setIsMenuOpen(false)}
    >
      <Category categories={categories} />
      <NavItems responses={categories} />
    </NavBarDiv>
  );
}

export default NavBar;
