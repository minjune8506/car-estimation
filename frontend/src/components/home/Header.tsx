import styled from "styled-components";
import HyundaiLogo from "../../assets/logo/logo_main.svg";
import NavBar from "../navigation/NavBar";
import { CategoryInfo } from "../navigation/types";
import { useRecoilState } from "recoil";
import { headerMenuState } from "./home_state";

const Logo = styled.div`
  margin-left: 1rem;
  margin-right: 10%;
  cursor: pointer;
`;

const MenuItems = styled.a<{ isMenuOpen: boolean }>`
  font-size: 0.8rem;
  border-bottom: ${(props) => (props.isMenuOpen ? "2px solid #007FA8" : "")};
  padding: 1rem;
`;

const MenuDiv = styled.div<{ isMenuOpen?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => (props.isMenuOpen ? "white" : "")};
`;

const HeaderWrapper = styled.header`
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 2;
`;

function Header() {
  const categories: CategoryInfo[] = [
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

  const [isMenuOpen, setIsMenuOpen] = useRecoilState(headerMenuState);

  return (
    <HeaderWrapper>
      <MenuDiv isMenuOpen={isMenuOpen}>
        <Logo>
          <img src={HyundaiLogo} alt="현대차 로고"></img>
        </Logo>
        <MenuItems
          onMouseOver={() => setIsMenuOpen(true)}
          isMenuOpen={isMenuOpen}
        >
          <div style={{ cursor: "pointer" }}>모델</div>
        </MenuItems>
      </MenuDiv>
      <NavBar categories={categories}></NavBar>
    </HeaderWrapper>
  );
}

export default Header;
