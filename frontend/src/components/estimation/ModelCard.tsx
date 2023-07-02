import styled from "styled-components";
import { SelectButton } from "../common/button/Button";

interface ModelDetail {
  detailImg1: string;
  detailImg2: string;
  detailImg3: string;
}

interface Model {
  trimName: string;
  price: number;
  modelImg: string;
  basicInfo: string;
  trimDetail: ModelDetail;
}

const model: Model = {
  trimName: "Modern",
  price: 28500000,
  modelImg: "/images/car/model/tucson/modern/DD.png",
  basicInfo: "디젤 2WD A/T",
  trimDetail: {
    detailImg1: "/images/car/model/tucson/modern/DD-USP-001.png",
    detailImg2: "/images/car/model/tucson/modern/DD-USP-002.png",
    detailImg3: "/images/car/model/tucson/modern/DD-USP-003.png",
  },
};

const BoldText = styled.span<{ fontSize?: string }>`
  font-weight: bold;
  font-size: ${(props) => props.fontSize || "large"};
`;

export default () => {
  return (
    <div
      className="flex flex-col p-6"
      style={{ backgroundColor: "#f6f3f2" }}
      id="model_info"
    >
      <BoldText className="mb-2">{model.trimName}</BoldText>
      <BoldText fontSize="medium">{model.price} 원</BoldText>
      <div className="flex items-center justify-center w-full cursor-pointer my-4">
        <img src={model.modelImg} alt="투싼 모델 이미지"></img>
      </div>
      <div className="flex flex-row justify-between my-4">
        <span className="text-sm">{model.basicInfo}</span>
        <span className="text-sm cursor-pointer text-[#002C5F]">
          상세 품목 &gt;
        </span>
      </div>
      <hr />
      <div className="flex flex-row justify-evenly my-4 w-full">
        <div>
          <img
            className="object-fill"
            src={model.trimDetail.detailImg1}
            alt="detail1"
          ></img>
        </div>
        <div>
          <img
            className="object-fill"
            src={model.trimDetail.detailImg2}
            alt="detail2"
          ></img>
        </div>
        <div>
          <img
            className="object-fill"
            src={model.trimDetail.detailImg3}
            alt="detail3"
          ></img>
        </div>
      </div>
      <SelectButton primary={true} className="mt-4 text-sm">
        내 차 만들기
      </SelectButton>
    </div>
  );
};
