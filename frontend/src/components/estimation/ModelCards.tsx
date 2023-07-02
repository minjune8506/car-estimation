import styled from "styled-components";
import ModelCard from "./ModelCard";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;

  #model_info:not(:last-child) {
    margin-right: 1.5rem;
  }
`;

export default () => {
  return (
    <Container>
      <ModelCard />
      <ModelCard />
      <ModelCard />
    </Container>
  );
};
