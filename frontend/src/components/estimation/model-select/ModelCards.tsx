import styled from "styled-components";
import ModelCard from "./ModelCard";
import { Model } from "src/types/Model";

const ModelCards = styled.ol`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

interface ModelCardsProps {
  models: Model[];
}

export default ({ models }: ModelCardsProps) => {
  return (
    <ModelCards>
      {models.map((model) => (
        <ModelCard trimInfo={model} key={model.id} />
      ))}
    </ModelCards>
  );
};
