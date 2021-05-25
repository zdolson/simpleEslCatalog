import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  components: {
    Skeleton: {
      baseStyle: {
        animationDuration: "1.2s"
      }
    }
  }
});

export default customTheme;