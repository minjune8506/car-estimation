import styled from "styled-components";
import { Model } from "src/types/Model";
import { useLocation, useNavigate } from "react-router-dom";
import { getCarIdFrom } from "src/common/utils/location-utils";
import { SelectButton } from "src/components/common/button/Button";
import { memo } from "react";

interface ModelCardsProps {
  models: Model[];
}

export default function ModelCards({ models }: ModelCardsProps) {
  return (
    <StyledModelCards>
      {models.map((model) => (
        <MemoizedModelCard modelInfo={model} key={model.id} />
      ))}
    </StyledModelCards>
  );
}

const MemoizedModelCard = memo(ModelCard);

interface ModelCardProps {
  modelInfo: Model;
}

function ModelCard({ modelInfo }: ModelCardProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const carId = getCarIdFrom(location);

  const navigateToCarMaking = (carId: number, modelId: number) => {
    navigate(`/estimation/making?carId=${carId}&modelId=${modelId}`);
  };

  return (
    <ModelCardStyle>
      <BoldText className="mb-2">{modelInfo.trimName}</BoldText>
      <BoldText>{modelInfo.price.toLocaleString("ko-KR")} 원</BoldText>
      <div
        className="flex items-center justify-center w-full cursor-pointer my-4"
        onClick={() => navigateToCarMaking(carId, modelInfo.id)}
      >
        <img src={`/images/${modelInfo.imgPath}`} alt="차량 이미지"></img>
      </div>
      <div className="flex flex-row justify-between my-4 text-gray-500">
        <span className="text-sm">{modelInfo.basicInfo}</span>
      </div>
      <hr />
      <div className="flex flex-row justify-evenly my-4 w-full">
        {modelInfo.detailImgs.map((detailImg, idx) => (
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
        onClick={() => navigateToCarMaking(carId, modelInfo.id)}
      >
        내 차 만들기
      </SelectButton>
    </ModelCardStyle>
  );
}

const StyledModelCards = styled.ol`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

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
