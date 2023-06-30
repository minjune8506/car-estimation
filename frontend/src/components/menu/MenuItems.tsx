import styled from "styled-components";
import MenuItem from "./MenuItem";

const MenuItems = styled.ul`
  margin-left: 10%;
`;

export default () => {
  return (
    <MenuItems>
      <MenuItem>
        <div>모델</div>
      </MenuItem>
    </MenuItems>
  );
};
