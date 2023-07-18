import LogoSrc from "/images/logo/logo_footer.png";
import Logo42 from "/images/logo/logo_42.svg";
import styled from "styled-components";

function Footer() {
  return (
    <footer className="text-white w-screen absolute bottom-0 left-0 bg-[#1c1b1b]">
      <ul className="flex flex-row items-center py-2">
        <li>
          <HyundaiLogo src={LogoSrc}></HyundaiLogo>
        </li>
        <ol className="grow">
          <li className="mb-2">김민준</li>
          <li>내 차 만들기 프로젝트</li>
        </ol>
        <li>
          <FourtyTwoLogo src={Logo42}></FourtyTwoLogo>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;

const HyundaiLogo = styled.img.attrs({
  className: "mx-5 object-contain h-8",
})``;

const FourtyTwoLogo = styled.img.attrs({
  className: "mx-5 object-contain h-12",
})``;
