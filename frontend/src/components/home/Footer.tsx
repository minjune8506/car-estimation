import LogoSrc from "/images/logo/logo_footer.png";
import Logo42 from "/images/logo/logo_42.svg";
import styled from "styled-components";

const FooterDiv = styled.footer.attrs({
  className: "text-white w-screen relative bottom-0",
})`
  background-color: #1c1b1b;
`;

const FooterUl = styled.ul.attrs({
  className: "flex flex-row items-center py-2",
})``;

const HyundaiLogo = styled.img.attrs({
  className: "mx-5 object-contain h-8",
})``;

const FourtyTwoLogo = styled.img.attrs({
  className: "mx-5 object-contain h-12",
})``;

const FooterInfo = styled.ol.attrs({ className: "grow" })``;

const Name = styled.li.attrs({ className: "mb-2" })``;

function Footer() {
  return (
    <FooterDiv>
      <FooterUl>
        <li>
          <HyundaiLogo src={LogoSrc}></HyundaiLogo>
        </li>
        <FooterInfo>
          <Name>김민준</Name>
          <li>내 차 만들기 프로젝트</li>
        </FooterInfo>
        <li>
          <FourtyTwoLogo src={Logo42}></FourtyTwoLogo>
        </li>
      </FooterUl>
    </FooterDiv>
  );
}

export default Footer;
