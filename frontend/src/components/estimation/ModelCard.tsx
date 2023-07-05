import styled from "styled-components";
import { SelectButton } from "../common/button/Button";
import { addCommaToPrice } from "../../common/utils/price_utils";
import { ModelTrim } from "../../types/ModelTrim";

const BoldText = styled.span<{ fontSize?: string }>`
  font-weight: bold;
  font-size: ${(props) => props.fontSize || "large"};
`;

interface ModelCardProps {
  trimInfo: ModelTrim;
}

export default ({ trimInfo }: ModelCardProps) => {
  return (
    <div
      className="flex flex-col p-6"
      style={{ backgroundColor: "#f6f3f2" }}
      id="model_info"
    >
      <BoldText className="mb-2">{trimInfo.trimName}</BoldText>
      <BoldText>{trimInfo.price.toLocaleString("ko-KR")} 원</BoldText>
      <div className="flex items-center justify-center w-full cursor-pointer my-4">
        <img src={`/images/${trimInfo.modelImg}`} alt="차량 이미지"></img>
      </div>
      <div className="flex flex-row justify-between my-4">
        <span className="text-sm">{trimInfo.basicInfo}</span>
        <span className="text-sm cursor-pointer text-[#002C5F]">
          상세 품목 &gt;
        </span>
      </div>
      <hr />
      <div className="flex flex-row justify-evenly my-4 w-full">
        {trimInfo.detailImgs.map((detailImg, idx) => (
          <div key={idx}>
            <img
              className="object-fill"
              src={`/images/${detailImg}`}
              alt="트림 세부 정보"
            ></img>
          </div>
        ))}
      </div>
      <SelectButton primary={true} className="mt-4 text-sm">
        내 차 만들기
      </SelectButton>
    </div>
  );
};
