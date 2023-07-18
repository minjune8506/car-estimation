import styled from "styled-components";
import { SelectButton } from "../../common/button/Button";
import { getCarIdFrom } from "src/common/utils/location-utils";
import { useLocation, useNavigate } from "react-router-dom";
import { Model } from "src/types/Model";

interface ModelCardProps {
  trimInfo: Model;
}

export default ({ trimInfo }: ModelCardProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const carId = getCarIdFrom(location);

  const navigateToCarMaking = (carId: number, modelId: number) => {
    navigate(`/estimation/making?carId=${carId}&modelId=${modelId}`);
  };

  return (
    <ModelCardStyle>
      <BoldText className="mb-2">{trimInfo.trimName}</BoldText>
      <BoldText>{trimInfo.price.toLocaleString("ko-KR")} 원</BoldText>
      <div
        className="flex items-center justify-center w-full cursor-pointer my-4"
        onClick={() => navigateToCarMaking(carId, trimInfo.id)}
      >
        <img src={`/images/${trimInfo.imgPath}`} alt="차량 이미지"></img>
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
      <SelectButton
        primary={true}
        className="mt-4 text-sm"
        onClick={() => navigateToCarMaking(carId, trimInfo.id)}
      >
        내 차 만들기
      </SelectButton>
    </ModelCardStyle>
  );
};

const BoldText = styled.span<{ fontSize?: string }>`
  font-weight: bold;
  font-size: ${(props) => props.fontSize || "large"};
`;

const ModelCardStyle = styled.li`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  background-color: #f6f3f2;

  &:not(:last-child) {
    margin-right: 2rem;
  }
`;
