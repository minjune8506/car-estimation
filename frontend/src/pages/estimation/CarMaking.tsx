import styled from "styled-components";
import { convertPrice } from "common/utils/price-utils";
import { Car } from "types/Car";
import { ModelTrim } from "types/ModelTrim";
import Header from "src/components/estimation/Header";
import Colors from "components/estimation/car-making/Colors";
import OptionCards from "components/estimation/car-making/OptionCards";
import { Option } from "types/Option";
import { Color } from "types/Color";

export default function CarMaking() {
  return (
    <>
      <Header carId={1} current="Car-Making" />
      <Main className="flex flex-row w-full">
        <section className="flex flex-col p-8 grow">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">
              {car.carName} - {model.trimName}
            </h1>
            <span className="text-xs text-gray-500">{model.basicInfo}</span>
          </div>
          <div className="flex flex-row items-center">
            <span className="font-bold mr-8">총 차량 가격</span>
            <span className="text-2xl font-bold">
              {convertPrice(model.price)} 원
            </span>
          </div>
          <div className="w-full h-auto flex justify-center">
            <img src={car.carImg} />
          </div>
        </section>
        <hr className="h-full border-gray-200 border-[0.5px]" />
        <OptionSection className="px-12 overflow-y-scroll">
          <h2 className="text-2xl font-bold my-6">색상</h2>
          <Colors
            title="외장 색상"
            selected="아마존 그레이 메탈릭"
            colors={exteriorColors}
          ></Colors>
          <div className="my-6"></div>
          <Colors
            title="내장 색상"
            selected="블랙 모노톤"
            colors={interiorColors}
            isInterior={true}
          ></Colors>
          <h2 className="text-2xl font-bold my-6">옵션</h2>
          <OptionCards options={options} title="상세 품목"></OptionCards>
          <OptionCards
            options={options}
            backgroundImg="/images/HGenuineAccessories.png"
            title="H Genuine Accessories"
          ></OptionCards>
          <OptionCards
            options={options}
            backgroundImg="/images/NPerformance.png"
            title="N 퍼포먼스 파츠"
          ></OptionCards>
          <div className="flex items-center justify-center my-8">
            <button className="bg-[#002C5F] text-white text-sm py-3 px-6">
              내 차 만들기 완료
            </button>
          </div>
          &nbsp;
        </OptionSection>
      </Main>
    </>
  );
}

/** styles */

const Main = styled.main`
  display: flex;
  flex-direction: row;
  width: 100%;
  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const OptionSection = styled.section`
  padding: 0 3rem;
  overflow-y: scroll;
  width: 1200px;

  @media (max-width: 1024px) {
    overflow-y: visible;
    width: 100%;
  }
`;

/** Mock Data */

const car: Car = {
  carId: 1,
  carName: "더 뉴 아반떼",
  lowPrice: 20000000,
  carImg: "/images/car/avante/avante.png",
};

const model: ModelTrim = {
  id: 1,
  trimName: "Smart",
  price: 20000000,
  basicInfo: "더 뉴 아반떼 자가용 가솔린 1.6 Smart A/T",
  modelImg: "/model.jpg",
  detailImgs: ["/model1.jpg", "/model2.jpg", "/model3.jpg"],
};

const options: Option[] = [
  {
    id: 1,
    name: "컨비니언스 I",
    price: 690000,
    img: "/fullautoaircon_s.jpg",
    choiceYn: "Y",
  },
  {
    id: 2,
    name: "컨비니언스 II",
    price: 800000,
    img: "/frontheatedseat_s.jpg",
    choiceYn: "N",
  },
  {
    id: 3,
    name: "컨비니언스 II",
    price: 800000,
    img: "/frontheatedseat_s.jpg",
    choiceYn: "N",
  },
  {
    id: 4,
    name: "컨비니언스 II",
    price: 800000,
    img: "/frontheatedseat_s.jpg",
    choiceYn: "N",
  },
];

const exteriorColors: Color[] = [
  {
    id: 1,
    name: "아마존 그레이 메탈릭",
    img: "/colorchip-exterior.png",
    choiceYn: "Y",
    price: 0,
  },
  {
    id: 2,
    name: "아마존 그레이 메탈릭",
    img: "/colorchip-exterior.png",
    choiceYn: "N",
    price: 0,
  },
  {
    id: 3,
    name: "아마존 그레이 메탈릭",
    img: "/colorchip-exterior.png",
    choiceYn: "Y",
    price: 0,
  },
];

const interiorColors: Color[] = [
  {
    id: 1,
    name: "블랙 모노톤",
    img: "/colorchip-interior.png",
    choiceYn: "Y",
    price: 0,
  },
  {
    id: 2,
    name: "블랙 모노톤",
    img: "/colorchip-interior.png",
    choiceYn: "N",
    price: 0,
  },
  {
    id: 3,
    name: "블랙 모노톤",
    img: "/colorchip-interior.png",
    choiceYn: "Y",
    price: 0,
  },
];
