import styled from "styled-components";
import ModelCard from "./ModelCard";
import useModelTrim from "../../hooks/queries/model/useModelTrim";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;

  #model_info:not(:last-child) {
    margin-right: 1.5rem;
  }
`;

interface ModelCardsProps {
  carId: number;
  engineId: number;
  missionId: number;
  drivingTypeId: number;
}

export default ({
  carId,
  engineId,
  missionId,
  drivingTypeId,
}: ModelCardsProps) => {
  const { data, error, isLoading } = useModelTrim({
    carId,
    engineId,
    missionId,
    drivingTypeId,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  const trims = data;

  return (
    <Container>
      {trims.map((trim) => (
        <ModelCard trimInfo={trim} key={trim.id} />
      ))}
    </Container>
  );
};
