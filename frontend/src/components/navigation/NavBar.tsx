import { useState } from "react";
import styled from "styled-components";
import Category from "./Category";
import NavItems from "./NavItems";
import { CategoryInfo } from "./types";

const NavBarDiv = styled.div<{ isMenuOpen?: boolean }>`
  display: ${(props) => (props.isMenuOpen ? "flex" : "none")};
  background-color: #f6f3f2;
  height: 30rem;
  position: relative;
  z-index: 5;
`;

interface NavBarProps {
  isMenuOpen: boolean;
  closeMenu: () => void;
}

const responses: Array<CategoryInfo> = [
  {
    categoryId: "0",
    categoryName: "승용",
    car: [
      {
        carId: "0",
        name: "더 뉴 아반떼",
        lowPrice: "19600000",
        imgPath: "avante_small.png",
      },
    ],
  },
  {
    categoryId: "1",
    categoryName: "SUV",
    car: [
      {
        carId: "1",
        name: "투싼",
        lowPrice: "25840000",
        imgPath: "tucson_small.png",
      },
    ],
  },
];

function NavBar({ isMenuOpen, closeMenu }: NavBarProps) {
  const [current, setCurrent] = useState(responses[0].categoryId);

  const onMouseOver = (categroyId: string) => {
    setCurrent(categroyId);
  };

  return (
    <NavBarDiv isMenuOpen={isMenuOpen} onMouseLeave={closeMenu}>
      <Category
        current={current}
        responses={responses}
        onMouseOver={onMouseOver}
      />
      <NavItems current={current} responses={responses} closeMenu={closeMenu} />
    </NavBarDiv>
  );
}

export default NavBar;
