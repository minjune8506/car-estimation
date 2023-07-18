import styled from "styled-components";
import { ReactNode } from "react";
import { useRecoilState } from "recoil";
import { IsMainMenuOpen } from "src/states/HomeState";

export default function MenuItems() {
  return (
    <ul className="ml-24">
      <MenuItem>
        <div>모델</div>
      </MenuItem>
    </ul>
  );
}

interface MenuItemProps {
  children: ReactNode;
}

function MenuItem({ children }: MenuItemProps) {
  const [isMenuOpen, setMenuState] = useRecoilState(IsMainMenuOpen);

  return (
    <StyledMenuItem
      onMouseOver={() => setMenuState(true)}
      isMenuOpen={isMenuOpen}
    >
      {children}
    </StyledMenuItem>
  );
}

const StyledMenuItem = styled.li<{ isMenuOpen: boolean }>`
  font-size: 0.8rem;
  padding: 1rem;
  cursor: pointer;

  border-bottom: ${(props) => (props.isMenuOpen ? "2px solid #007FA8" : "")};
`;
