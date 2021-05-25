import * as React from "react";
import * as Chakra from "@chakra-ui/react";
import customTheme from "../customTheme";

function App({ Component, pageProps }) {
  return (
    <Chakra.ChakraProvider theme={customTheme}>
      <Component {...pageProps} />
    </Chakra.ChakraProvider>
  );
}

export default App;
