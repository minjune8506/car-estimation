import styled from "styled-components";

export default styled.div<{ width?: number; height?: number, position?: string }>`
  width: 100vw;
  height: 100vh;
  position: ${(props) => props.position || "absolute"};
  top: 0;
  left: 0;
  z-index: 500;
  backdrop-filter: brightness(60%);
`;
