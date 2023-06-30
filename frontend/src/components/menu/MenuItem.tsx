import { ReactNode } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import IsMainMenuOpenState from "../../states/menu/IsMainMenuOpenState";

const MenuItem = styled.li<{ isMenuOpen: boolean }>`
  font-size: 0.8rem;
  border-bottom: ${(props) => (props.isMenuOpen ? "2px solid #007FA8" : "")};
  padding: 1rem;
  cursor: pointer;
`;

interface MenuItemProps {
  children: ReactNode;
}

export default ({ children }: MenuItemProps) => {
  const [isMenuOpen, setMenuState] = useRecoilState(IsMainMenuOpenState);

  return (
    <MenuItem onMouseOver={() => setMenuState(true)} isMenuOpen={isMenuOpen}>
      {children}
    </MenuItem>
  );
};
