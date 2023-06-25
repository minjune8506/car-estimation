import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
${reset}

#root {
	width: 100vw;
	height: 100vh;
}

main {
	width: 100%;
	height: 100%;
}
`;
